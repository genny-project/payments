/* eslint no-unused-vars: 0 */
class PaymentProvider {
  constructor( config ) {
    this.config = config;
  }

  /* Returns the configuration for this payment provider */
  getConfig() {
    return this.config;
  }

  /* Returns an array of currencies that are being used by this payment provider */
  getCurrencies() {
    return this.config.currencies;
  }

  /* Returns whether or not this payment provider supports direct payments */
  supportsDirect() {
    return true;
  }

  /* Returns whether or not this payment provider supports marketplace payments */
  supportsMarketplace() {
    return true;
  }

  /* Creates a new user within this payment provider */
  async addUser( config ) {}

  /* Updates a user within this payment provider */
  async updateUser( config ) {}

  /* Removes a user within this payment provider */
  async removeUser( config ) {}
}

module.exports = PaymentProvider;
