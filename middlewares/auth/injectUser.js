module.exports = ( req, res, next ) => {
  /* Check whether a token was provided */
  if ( req.headers.authorization != null && req.headers.authorization !== 'null' ) {
    /* Based upon the authentication method attempt to authenticate the user */
  }

  next();
};
