/* Include requirements */
const API = require( '../../helpers/api/API' );
const securedRoute = require( '../../middlewares/auth/securedRoute' );

/* Releases the payment on the specified item */
API.post( '/:provider/fees', securedRoute, async ( req, res ) => {
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

  try {
    const response = await provider.createFee( req.body );
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
