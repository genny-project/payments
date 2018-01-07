/* Include dependencies */
const API = require( '../../helpers/api/API' );
const securedRoute = require( '../../middlewares/auth/securedRoute' );
const { UserFactory } = require( '../../factories' );

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
  res.json( req.body );
});
