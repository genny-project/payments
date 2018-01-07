module.exports = ( req, res, next ) => {
  /* This route is secured so a tenant must provide a token to access it */
  if ( !req.tenant ) {
    res.status( 401 );
    res.send({ error: 'You must be authenticated to make this request.' });
    return;
  }

  next();
};
