const { PaymentProvider } = require( '../../models' );

class AssemblyPayments extends PaymentProvider {
  getID() {
    return 'assembly';
  }

  supportsDirect() {
    return false;
  }

  addUser({ user, dryRun }) {
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

    console.log( user );
    console.log( dryRun );
  }
}

module.exports = AssemblyPayments;
