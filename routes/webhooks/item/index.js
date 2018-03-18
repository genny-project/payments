/* Include dependencies */
const WebhooksAPI = require( '../../../helpers/webhooks-api/WebhooksAPI' );
const Logger = require( '../../../helpers/logging/Logger' );
const { TenantConfigLoader } = require( '../../../helpers' );

WebhooksAPI.get( '/webhooks/item', ( req, res ) => {
  res.json({ name: 'Items webhook endpoint' });
});

WebhooksAPI.post( '/webhooks/item', ( req, res ) => {
  /* Get the tenant from the query parameters */
  const { tenantID } = req.query;

  const tenant = TenantConfigLoader.getTenant( tenantID );

  /* If the tenant doesn't exist throw an error */
  if ( !tenant ) {
    res.status( 400 );
    res.json({ error: 'The tenant ID provided is invalid.' });
    return;
  }

  Logger.info( `Incoming item webhook for tenant with ID ${tenant.getID()} ${JSON.stringify( req.body )}` );
  res.json({ success: true });
});
