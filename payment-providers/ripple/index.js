const { PaymentProvider } = require( '../../models' );

class Ripple extends PaymentProvider {
  getID() {
    return 'ripple';
  }

  supportsMarketplace() {
    return false;
  }

  getURL() {
    switch( this.getEnvironment()) {
      case 'test':
        return 'wss://s.altnet.rippletest.net:51233';
      case 'live':
        return 'wss://s2.ripple.com';
      default:
        return 'wss://s.altnet.rippletest.net:51233';
    }
  }
}

module.exports = Ripple;
