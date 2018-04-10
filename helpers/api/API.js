/* Include dependencies */
const express = require( 'express' );
const apiConfig = require( '../../config/api' );
const Logger = require( '../logging/Logger' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const injectTenant = require( '../../middlewares/auth/injectTenant' );
const mung = require( 'express-mung' );

/* Create a new express app and listen on the specified port */
const app = express();

/* Add inject tenant middleware */
app.use( injectTenant );

/* Accept JSON request bodies */
app.use( bodyParser.json());

/* Add cross origin request support */
app.use( cors());

/* Add logging of requests and responses if debug mode enabled */
if ( process.env.DEBUG === 'true' || true ) {
  app.use( mung.json(( body, req, res ) => {
    Logger.info( `${req.method} ${req.url}` );
    Logger.info( `Request: ${JSON.stringify( req.body, null, 2 )}` );
    Logger.info( `Response: ${res.statusCode} ${JSON.stringify( body, null, 2 )}` );

    return body;
  }));
}

app.httpServer = app.listen( apiConfig.port, () => {
  Logger.info( `API listening on port ${apiConfig.port}` );
});

module.exports = app;
