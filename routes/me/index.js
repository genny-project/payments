/* Include dependencies */
const API = require( '../../helpers/api/API' );
const securedRoute = require( '../../middlewares/auth/securedRoute' );

/* Returns a list of all the tenants on the system */
API.get( '/me', securedRoute, ( req, res ) => {
  res.json( req.tenant.getPublicInfo());
});
