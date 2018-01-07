/* Include dependencies */
const Logger = require( '../../helpers/logging/Logger' );

class PaymentProviderFactory {
  constructor() {
    this.providers = {};
  }

  /* Returns all of the currently loaded payment providers */
  getProviders() {
    return this.providers;
  }

  /* Returns the provider with the specified ID */
  getProvider( id ) {
    return this.providers[ id ];
  }

  /* Attempts to load a new payment provider with the specified ID */
  loadPaymentProvider( id ) {
    /* Check that we haven't already loaded this payment provider */
    if ( this.getProvider( id )) {
      Logger.error( `Already loaded payment provider with ID: ${id}` );
      return;
    }

    Logger.info( `Attempting to load payment provider with ID: ${id}` );

    try {
      const provider = require( `../../payment-providers/${id}` );
      this.providers[id] = provider;
      Logger.info( `Successfully loaded payment provider with ID: ${id}` );
    } catch ( e ) {
      Logger.error( `Failed to load payment provider with ID: ${id}. ${e}` );
    }
  }
}

module.exports = new PaymentProviderFactory();
