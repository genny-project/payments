/* Include dependencies */
const API = require( '../helpers/api/API' );

/* Include the sub routes */
require( './users' );
require( './tenants' );
require( './me' );

/* Define index routes */
API.get( '/', ( req, res ) => {
  res.json({ name: 'Payments API', version: process.env.BUILD_NUMBER });
});
