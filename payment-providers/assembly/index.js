const { PaymentProvider } = require( '../../models' );
const axios = require( 'axios' );
const UserNormalizer = require( './normalizers/UserNormalizer' );
const CompanyNormalizer = require( './normalizers/CompanyNormalizer' );

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
    /* Get a list of users from Assembly */
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
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async getUser({ id }) {
    /* Get the user with the specified ID from Assembly */
    try {
      const response = await axios({
        method: 'get',
        url: `${this.getURL()}/users/${id}`,
        auth: this.getOptions().auth,
      });

      /* Standardise the response */
      return {
        status: 200,
        data: {
          users: response.data.users && new UserNormalizer( response.data.users ).normalize(),
          meta: response.data.meta,
        }
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async createUser({ user }) {
    /* Creates a user */
    try {
      const response = await axios({
        method: 'post',
        url: `${this.getURL()}/users`,
        auth: this.getOptions().auth,
        data: {
          id: user && user.id,
          first_name: user && user.personalInfo && user.personalInfo.firstName,
          last_name: user && user.personalInfo && user.personalInfo.lastName,
          email: user && user.contactInfo && user.contactInfo.email,
          mobile: user && user.contactInfo && user.contactInfo.mobile,
          address_line1: user && user.location && user.location.addressLine1,
          address_line2: user && user.location && user.location.addressLine2,
          city: user && user.location && user.location.city,
          state: user && user.location && user.location.state,
          zip: user && user.location && user.location.postcode,
          country: user && user.location && user.location.country,
          dob: user && user.personalInfo && user.personalInfo.dob,
          government_number: user && user.personalInfo && user.personalInfo.governmentNumber,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.users && new UserNormalizer( response.data.users ).normalize(),
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async updateUser({ user }) {
    /* updates the user */
    try {
      const response = await axios({
        method: 'patch',
        url: `${this.getURL()}/users/${user.id}`,
        auth: this.getOptions().auth,
        data: {
          id: user && user.id,
          first_name: user && user.personalInfo && user.personalInfo.firstName,
          last_name: user && user.personalInfo && user.personalInfo.lastName,
          email: user && user.contactInfo && user.contactInfo.email,
          mobile: user && user.contactInfo && user.contactInfo.mobile,
          address_line1: user && user.location && user.location.addressLine1,
          address_line2: user && user.location && user.location.addressLine2,
          city: user && user.location && user.location.city,
          state: user && user.location && user.location.state,
          zip: user && user.location && user.location.postcode,
          country: user && user.location && user.location.country,
          dob: user && user.personalInfo && user.personalInfo.dob,
          government_number: user && user.personalInfo && user.personalInfo.governmentNumber,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.users && new UserNormalizer( response.data.users ).normalize(),
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async getCompanies({ options }) {
    /* Get a list of companies from Assembly */
    try {
      const response = await axios({
        method: 'get',
        url: `${this.getURL()}/companies`,
        auth: this.getOptions().auth,
        params: options,
      });

      /* Standardise the response */
      return {
        status: 200,
        data: {
          companies: response.data.companies && response.data.companies.map( c => new CompanyNormalizer( c ).normalize()),
          meta: response.data.meta,
        }
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async getCompany({ id }) {
    /* Get the company with the specified ID from Assembly */
    try {
      const response = await axios({
        method: 'get',
        url: `${this.getURL()}/companies/${id}`,
        auth: this.getOptions().auth,
      });

      /* Standardise the response */
      return {
        status: 200,
        data: {
          companies: response.data.companies && new CompanyNormalizer( response.data.companies ).normalize(),
          meta: response.data.meta,
        }
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }
}

module.exports = AssemblyPayments;
