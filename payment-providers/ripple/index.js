const { PaymentProvider } = require( '../../models' );

class Ripple extends PaymentProvider {
  getID() {
    return 'ripple';
  }

  supportsMarketplace() {
    return false;
  }
}

module.exports = Ripple;
