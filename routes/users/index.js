/* Include dependencies */
const API = require( '../../helpers/api/API' );
const securedRoute = require( '../../middlewares/auth/securedRoute' );
const { UserFactory } = require( '../../factories' );
const { User } = require( '../../models' );
const isEmail = require( 'isemail' );
const Logger = require( '../../helpers/logging/Logger' );

/* Returns a list of all the users for the tenant that made the request */
API.get( '/users', securedRoute, async ( req, res ) => {
  const users = await UserFactory.getAllUsers( req.tenant.getID());
  res.json( users );
});

/* Gets the user with the specified ID */
API.get( '/users/:id', securedRoute, async( req, res ) => {
  const user = await UserFactory.getUserByID( req.tenant.getID(), req.params.id );

  /* If the user doesn't exist return a 404 */
  if ( !user ) {
    res.status( 404 );
    res.json({ error: `The user with ID: ${req.params.id} does not exist.` });
    return;
  }

  /* Return the user */
  res.json( user );
});

/* Creates a new user */
API.post( '/users', securedRoute, async( req, res ) => {
  /* Get the tenant who made this request */
  const tenant = req.tenant;

  /* Get the request data, injecting in the tenant ID */
  const data = {
    ...req.body,
    tenant: tenant.getID(),
  };

  /* Check that a first name was provided */
  if ( !data.firstName || data.firstName.trim() === '' ) {
    res.status( 400 );
    res.json({ error: 'A first name must be provided.', errorField: 'firstName' });
    return;
  }

  /* Check that a last name was provided */
  if ( !data.lastName || data.lastName.trim() === '' ) {
    res.status( 400 );
    res.json({ error: 'A last name must be provided.', errorField: 'lastName' });
    return;
  }

  /* Check that a email address was provided */
  if ( !data.email || data.email.trim() === '' ) {
    res.status( 400 );
    res.json({ error: 'A email address must be provided.', errorField: 'email' });
    return;
  }

  /* Check that the email address is a valid email address */
  if ( !isEmail.validate( data.email )) {
    res.status( 400 );
    res.json({ error: 'A valid email address must be provided.', errorField: 'email' });
    return;
  }

  /* Trim all the fields */
  data.firstName = data.firstName.trim();
  data.lastName = data.lastName.trim();
  data.email = data.email.trim();

  /* Check that there isn't any other users with this same email address */
  const existing = await UserFactory.getUserByEmail( tenant.getID(), data.email );

  if ( existing ) {
    res.status( 400 );
    res.json({ error: 'A user with this email address already exists.', errorField: 'email' });
    return;
  }

  /* Create the user */
  const user = new User( data );

  /* Before saving the user let's check whether we have enough information for each payment provider */
  try {
    await Promise.all( tenant.getProviders().map( async provider => {
      return provider.addUser({ user, dryRun: true });
    }));
  } catch ( e ) {
    console.log( e.response.data );
    Logger.error( e.message );
    res.status( 400 );
    res.json({ error: e.message });
    return;
  }

  /* Do the whole thing again but real this time */
  try {
    await Promise.all( tenant.getProviders().map( async provider => {
      return provider.addUser({ user, dryRun: false });
    }));
  } catch ( e ) {
    console.log( e.response.data );
    Logger.error( e.message );
    res.status( 400 );
    res.json({ error: e.message });
    return;
  }

  /* Save the user */
  await UserFactory.saveUser( user );

  res.json( user );
});
