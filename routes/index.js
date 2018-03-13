/* Include dependencies */
const API = require( '../helpers/api/API' );

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

/* Define index routes */
API.get( '/', ( req, res ) => {
  res.json({ name: 'Payments API', version: process.env.BUILD_NUMBER });
});
