const Errors = require( '../../helpers/errors' );

module.exports = ( req, res, next ) => {
  /* This route is secured so a tenant must provide a token to access it */
  if ( !req.user ) {
    return next({ error: Errors.AUTH_REQUIRED, status: 401 });
  }

  next();
};
