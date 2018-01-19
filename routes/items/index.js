/* Include dependencies */
const API = require( '../../helpers/api/API' );
const securedRoute = require( '../../middlewares/auth/securedRoute' );

/* Returns a list of all the items on the system */
API.get( '/:provider/items', securedRoute, async ( req, res ) => {
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

  /* Get a list of items */
  try {
    const response = await provider.getItems({ options: req.query });

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
