/* Include dependencies */
const API = require( '../helpers/api/API' );
const WebhooksAPI = require( '../helpers/webhooks-api/WebhooksAPI' );

/* Include the sub routes */
require( './users' );
require( './company' );
require( './tenants' );
require( './me' );
require( './payment-providers' );
require( './items' );
require( './tokens' );
require( './fees' );
require( './payment-authority' );
require( './bank-accounts' );
require( './card-accounts' );

/* In the webhooks subroute */
require( './webhooks/item' );

/* Define index routes */
API.get( '/', ( req, res ) => {
  res.json({ name: 'Payments API', version: process.env.BUILD_NUMBER });
});

WebhooksAPI.get( '/', ( req, res ) => {
  res.json({ name: 'Payments Webhook API', version: process.env.BUILD_NUMBER });
});
