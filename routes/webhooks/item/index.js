/* Include dependencies */
const WebhooksAPI = require( '../../../helpers/webhooks-api/WebhooksAPI' );
const Logger = require( '../../../helpers/logging/Logger' );
const { TenantConfigLoader } = require( '../../../helpers' );
const Formatters = require( '../../../helpers/webhook-formatters' );
const axios = require( 'axios' );

WebhooksAPI.get( '/webhooks/:provider/item', ( req, res ) => {
  res.json({ name: `Items webhook endpoint for provider ${req.params.provider}` });
});

WebhooksAPI.post( '/webhooks/:provider/item', async ( req, res ) => {
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

  /* Format the webhook */
  let formatter = Formatters.getFormatter( provider.getWebhooks().item.format );
  const formattedData = formatter.formatItemWebhook( req.body );

  /* Get the additional webhook headers */
  const headers = await formatter.getRequestHeaders( provider.getWebhooks().item );

  /* Log the formatted data */
  Logger.info( `Formatted webhook for tenant with ID ${tenant.getID()} ${JSON.stringify( formattedData )}` );

  /* Send the http request upstream */
  try {
    const response = await axios.post( provider.getWebhooks().item.url, formattedData, { headers });
    Logger.info( `Webhook upstream response ${JSON.stringify( response.data )}` );
    res.json({ success: true });
    return;
  } catch ( e ) {
    res.status( 500 );
    Logger.error( `Webhook upstream error ${JSON.stringify( e.message )}` );
    res.json({ error: true, errorMessage: e.message });
    return;
  }
});
