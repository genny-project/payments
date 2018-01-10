const { PaymentProvider } = require( '../../models' );
const axios = require( 'axios' );
const UserNormalizer = require( './normalizers/UserNormalizer' );

class AssemblyPayments extends PaymentProvider {
  getID() {
    return 'assembly';
  }

  supportsDirect() {
    return false;
  }

  getURL() {
    switch( this.getEnvironment()) {
      case 'test':
        return 'https://test.api.promisepay.com';
      case 'live':
        return 'https://secure.api.promisepay.com';
      default:
        return 'https://test.api.promisepay.com';
    }
  }

  async getUsers({ options }) {
    /* Create the user in Assembly */
    console.log( options );
    try {
      const response = await axios({
        method: 'get',
        url: `${this.getURL()}/users`,
        auth: this.getOptions().auth,
        params: options,
      });

      /* Standardise the response */
      return {
        status: 200,
        data: {
          users: response.data.users && response.data.users.map( u => new UserNormalizer( u ).normalize()),
          meta: response.data.meta,
        }
      };
    } catch ( e ) {
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  }
}

module.exports = AssemblyPayments;
