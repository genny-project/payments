/* Include dependencies */
const express = require( 'express' );
const apiConfig = require( '../../config/api' );
const Logger = require( '../logging/Logger' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

/* Create a new express app and listen on the specified port */
const app = express();

/* Accept JSON request bodies */
app.use( bodyParser.json());

/* Add cross origin request support */
app.use( cors());

app.httpServer = app.listen( apiConfig.port, () => {
  Logger.info( `API listening on port ${apiConfig.port}` );
});

module.exports = app;
