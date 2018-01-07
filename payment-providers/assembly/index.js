const { PaymentProvider } = require( '../../models' );
const axios = require( 'axios' );

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

  async addUser({ user, dryRun }) {
    /* Get the provided data from the user */
    const { _id, firstName, lastName, phoneNumber, email, address, ...rest } = user;

    /* Check that we have the required fields */
    if ( !_id || _id.toString().trim() === '' ) {
      throw new Error( 'A valid ID must be provided.' );
    }

    if ( !firstName || firstName.trim() === '' ) {
      throw new Error( 'A valid first name must be provided.' );
    }

    if ( !lastName || lastName.trim() === '' ) {
      throw new Error( 'A valid last name must be provided.' );
    }

    if ( !email || email.trim() === '' ) {
      throw new Error( 'A valid email address must be provided.' );
    }

    if ( !address || !address.country || address.country.trim() === '' ) {
      throw new Error( 'A valid country code must be provided.' );
    }

    console.log( this.getURL());

    /* If this is a dry run stop processing */
    if ( dryRun ) {
      return true;
    }

    /* Create the user in Assembly */
    return axios({
      method: 'post',
      url: `${this.getURL()}/users`,
      auth: this.getOptions().auth,
      data: {
        id: _id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: phoneNumber,
        country: address.country,
      }
    });
  }
}

module.exports = AssemblyPayments;
