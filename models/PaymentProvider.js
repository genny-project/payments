/* eslint no-unused-vars: 0 */
class PaymentProvider {
  constructor( config ) {
    this.config = config;
  }

  /* Returns the configuration for this payment provider */
  getConfig() {
    return this.config;
  }

  /* Validates data before adding a user. Returns true if allowed, throws an exception if not */
  validateAddUser( user ) { return true; }

  /* Creates a new user within this payment provider */
  async addUser( user ) {}

  /* Validates data before updating a user. Returns true if allowed, throws an exception if not */
  validateUpdateUser( user ) { return true; }

  /* Updates a user within this payment provider */
  async updateUser( user ) {}

  /* Validates data before removing a user. Returns true if allowed, throws an exception if not */
  validateRemoveUser( user ) { return true; }

  /* Removes a user within this payment provider */
  async removeUser( user ) {}
}

module.exports = PaymentProvider;
