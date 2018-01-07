/* eslint no-unused-vars: 0 */
class PaymentProvider {
  constructor( config ) {
    this.config = config;
  }

  /* Returns the ID of this payment provider */
  getID() {
    return '';
  }

  /* Returns the configuration for this payment provider */
  getConfig() {
    return this.config;
  }

  /* Returns the options for this payment provider */
  getOptions() {
    return this.config.options;
  }

  /* Returns an array of currencies that are being used by this payment provider */
  getCurrencies() {
    return this.config.currencies;
  }

  /* Returns the environment we are operating in */
  getEnvironment() {
    return this.config.environment;
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
  async addUser({ user, dryRun }) {}

  /* Updates a user within this payment provider */
  async updateUser({ user, dryRun }) {}

  /* Removes a user within this payment provider */
  async removeUser({ user, dryRun }) {}
}

module.exports = PaymentProvider;
