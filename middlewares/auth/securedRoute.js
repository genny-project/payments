const Errors = require( '../../helpers/errors' );

module.exports = ( req, res, next ) => {
  /* This route is secured so a user must be provided a token to access it */
  if ( !req.user ) {
    return next({ error: Errors.AUTH_REQUIRED, status: 401 });
  }

  next();
};
