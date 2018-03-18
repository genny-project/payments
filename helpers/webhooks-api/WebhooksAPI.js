/* Include dependencies */
const express = require( 'express' );
const apiConfig = require( '../../config/api' );
const Logger = require( '../logging/Logger' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const mung = require( 'express-mung' );

/* Create a new express app and listen on the specified port */
const app = express();

/* Accept JSON request bodies */
app.use( bodyParser.json());

/* Add cross origin request support */
app.use( cors());

/* Add logging of requests and responses if debug mode enabled */
if ( process.env.DEBUG === 'true' ) {
  app.use( mung.json(( body, req, res ) => {
    Logger.info( `${req.method} ${req.url}` );
    Logger.info( `Request: ${JSON.stringify( req.body, null, 2 )}` );
    Logger.info( `Response: ${res.statusCode} ${JSON.stringify( body, null, 2 )}` );

    return body;
  }));
}

app.httpServer = app.listen( apiConfig.webhookPort, () => {
  Logger.info( `Webhooks API listening on port ${apiConfig.webhookPort}` );
});

module.exports = app;
