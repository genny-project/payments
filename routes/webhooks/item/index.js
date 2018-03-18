/* Include dependencies */
const WebhooksAPI = require( '../../../helpers/webhooks-api/WebhooksAPI' );
const Logger = require( '../../../helpers/logging/Logger' );

WebhooksAPI.get( '/webhooks/item', ( req, res ) => {
  res.json({ name: 'Items webhook endpoint' });
});

WebhooksAPI.post( '/webhooks/item', ( req, res ) => {
  Logger.info( `Incoming item webhook ${JSON.stringify( req.body )}` );
  res.json({ success: true });
});
