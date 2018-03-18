/* Include dependencies */
const WebhooksAPI = require( '../../../helpers/webhooks-api/WebhooksAPI' );
const Logger = require( '../../../helpers/logging/Logger' );
const { TenantConfigLoader } = require( '../../../helpers' );

WebhooksAPI.get( '/webhooks/:provider/item', ( req, res ) => {
  res.json({ name: `Items webhook endpoint for provider ${req.params.provider}` });
});

WebhooksAPI.post( '/webhooks/:provider/item', ( req, res ) => {
  /* Get the tenant from the query parameters */
  const { tenantID } = req.query;

  const tenant = TenantConfigLoader.getTenant( tenantID );

  /* If the tenant doesn't exist throw an error */
  if ( !tenant ) {
    res.status( 400 );
    res.json({ error: 'The tenant ID provided is invalid.' });
    return;
  }

  /* Get the payment provider ID */
  const paymentProviderID = req.params.provider;

  const provider = tenant.getProvider( paymentProviderID );

  if ( provider == null ) {
    res.status( 400 );
    res.json({ error: `The tenant with ID ${tenant.getID()} does not have a payment provider with ID ${paymentProviderID}` });
    return;
  }

  Logger.info( `Incoming item webhook for tenant with ID ${tenant.getID()} ${JSON.stringify( req.body )}` );
  res.json({ success: true });
});
