/* eslint no-unused-vars: 0 */
class PaymentProvider {
  constructor( config ) {
    this.config = config;
  }

  /* Returns the configuration for this payment provider */
  getConfig() {
    return this.config;
  }

  async addUser( user ) {}
  async updateUser( user ) {}
  async removeUser( user ) {}
}

module.exports = PaymentProvider;
