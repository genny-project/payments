/* Include dependencies */
const API = require( '../helpers/api/API' );

/* Define index routes */
API.get( '/', ( req, res ) => {
  res.json({ name: 'Payments API' });
});
