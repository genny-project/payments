/* Include dependencies */
const API = require( '../../helpers/api/API' );
const securedRoute = require( '../../middlewares/auth/securedRoute' );
const { UserFactory } = require( '../../factories' );

/* Returns a list of all the users for the tenant that made the request */
API.get( '/users', securedRoute, async ( req, res ) => {
  const users = await UserFactory.getAllUsers( req.tenant.getID());
  res.json( users );
});
