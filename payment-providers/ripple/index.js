const { PaymentProvider } = require( '../../models' );

class Ripple extends PaymentProvider {
  supportsMarketplace() {
    return false;
  }
}

module.exports = Ripple;
