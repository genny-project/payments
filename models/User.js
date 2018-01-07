/* Get access to the database */
const db = require( '../helpers/db' );
const Schema = db.Schema;

/* Create the user schema */
const userSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  tenant: { type: String, required: true }
}, {
  timestamps: true,
});

/* Export the schema for use */
module.exports = db.model( 'User', userSchema );
