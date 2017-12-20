/* Include dependencies */
const API = require( '../helpers/api/API' );

/* Include the sub routes */
require( './users' );

/* Define index routes */
API.get( '/', ( req, res ) => {
  res.json({ name: 'Payments API' });
});
