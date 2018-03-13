/* Include requirements */
const API = require( '../../helpers/api/API' );
const securedRoute = require( '../../middlewares/auth/securedRoute' );

/* Deletes the bank account with the specified ID */
API.delete( '/:provider/bank-accounts/:id', securedRoute, async ( req, res ) => {
  /* Get the tenant who made this request */
  const tenant = req.tenant;

  /* Get the provider ID */
  const providerID = req.params.provider;

  /* Get the provider */
  const provider = tenant.getProvider( providerID );

  /* Check that the provider exists */
  if ( !provider ) {
    res.status( 404 );
    res.json({ error: 'Provider not found.' });
    return;
  }

  /* Get the ID of the bank account */
  const id = req.params.id;

  try {
    const response = await provider.deleteBankAccount( id );
    /* Set the status and return the response */
    res.status( response.status );
    res.json( response.data );
    return;
  } catch ( e ) {
    /* There was an error */
    res.status( e.status );
    res.json( e.data );
    return;
  }
});
