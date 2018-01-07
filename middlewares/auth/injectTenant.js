/* Include dependencies */
const atob = require( 'atob' );
const { TenantConfigLoader } = require( '../../helpers' );
const Logger = require( '../../helpers/logging/Logger' );

module.exports = ( req, res, next ) => {
  /* Check whether a token was provided */
  if ( req.headers.authorization != null && req.headers.authorization !== 'null' ) {
    /* Get the token */
    const token = req.headers.authorization;

    /* Decode the provided authentication token */
    const decodedToken = atob( token );

    /* Attempt to parse the token */
    let parsed = null;

    try {
      parsed = JSON.parse( decodedToken );
    } catch( e ) {
      Logger.warn( 'Failed to parse token.' );

      /* Return an error response */
      res.status( 401 );
      res.json({ error: 'Failed to parse token.' });
      return;
    }

    /* Token was parsed, check to see whether we have required fields */
    if ( !parsed || !parsed.tenant || !parsed.token || !parsed.secret ) {
      Logger.warn( 'Failed to read invalid token.' );

      /* Return an error response */
      res.status( 401 );
      res.json({ error: 'Failed to read invalid token' });
      return;
    }

    /* Token is in correct format, get the tenant with the provided ID */
    const tenant = TenantConfigLoader.getTenant( parsed.tenant );

    if ( !tenant ) {
      /* Tenant doesn't exist, log a warning */
      Logger.warn( 'Tenant ID supplied in token is invalid.' );

      /* Return an error response */
      res.status( 401 );
      res.json({ error: 'Tenant ID supplied in token is invalid.' });
      return;
    }

    /* Check that the token and secret provided are correct */
    if ( !tenant.checkAuthToken( parsed.token, parsed.secret )) {
      /* Tenant doesn't exist, log a warning */
      Logger.warn( 'Invalid token and / or secret.' );

      /* Return an error response */
      res.status( 401 );
      res.json({ error: 'Invalid token and / or secret.' });
      return;
    }

    /* Authentication token is valid, store the tenant object in the request details */
    req.tenant = tenant;
  }

  next();
};
