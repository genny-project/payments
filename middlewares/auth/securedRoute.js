const Errors = require( '../../helpers/errors' );

module.exports = role => ( req, res, next ) => {
  /* This route is secured so a user must be provided a token to access it */
  if ( !req.user ) {
    return next({ error: Errors.AUTH_REQUIRED, status: 401 });
  }

  if ( role ) {
    if ( role.length && role.indexOf( req.user.role ) < 0 ) {
      return next({ error: Errors.ACCESS_DENIED, status: 401 });
    }

    if ( !role.length && role != req.user.role ) {
      return next({ error: Errors.ACCESS_DENIED, status: 401 });
    }
  }

  next();
};
