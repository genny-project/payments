const { PaymentProvider } = require( '../../models' );

class AssemblyPayments extends PaymentProvider {
  supportsDirect() {
    return false;
  }
}

module.exports = AssemblyPayments;
