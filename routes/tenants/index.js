/* Include dependencies */
const API = require( '../../helpers/api/API' );
const { TenantConfigLoader } = require( '../../helpers' );

/* Returns a list of all the tenants on the system */
API.get( '/tenants', ( req, res ) => {
  res.json( TenantConfigLoader.getAll().map( tenant => tenant.getPublicInfo()));
});
