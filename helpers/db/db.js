/* Include dependencies */
const mongoose = require( 'mongoose' );

/* Include the config file */
const dbConfig = require( '../../config/db.js' );

/* Connect to the database */
mongoose.connect( dbConfig.url, { useMongoClient: true });

/* Define promise method */
mongoose.Promise = global.Promise;

/* Export the mongoose instance so it can be used easily */
module.exports = mongoose;
