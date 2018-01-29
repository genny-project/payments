const { PaymentProvider } = require( '../../models' );
const axios = require( 'axios' );
const UserNormalizer = require( './normalizers/UserNormalizer' );
const CompanyNormalizer = require( './normalizers/CompanyNormalizer' );
const ItemNormalizer = require( './normalizers/ItemNormalizer' );
const TokenNormalizer = require( './normalizers/TokenNormalizer' );
const FeeNormalizer = require( './normalizers/FeeNormalizer' );

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

  async updateCompany({ company }) {
    /* updates the company */
    try {
      const response = await axios({
        method: 'patch',
        url: `${this.getURL()}/companies/${company.id}`,
        auth: this.getOptions().auth,
        data: {
          id: company && company.id,
          name: company && company.name,
          legal_name: company && company.legalName,
          tax_number: company && company.taxNumber,
          charge_tax: company && company.chargesTax,
          address_line1: company && company.location && company.location.addressLine1,
          address_line2: company && company.location && company.location.addressLine2,
          city: company && company.location && company.location.city,
          state: company && company.location && company.location.state,
          zip: company && company.location && company.location.postcode,
          country: company && company.location && company.location.country,
          phone: company && company.contactInfo && company.contactInfo.phone,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.companies && new CompanyNormalizer( response.data.companies ).normalize(),
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async createCompany({ company }) {
    /* updates the company */
    try {
      const response = await axios({
        method: 'post',
        url: `${this.getURL()}/companies`,
        auth: this.getOptions().auth,
        data: {
          id: company && company.id,
          name: company && company.name,
          legal_name: company && company.legalName,
          tax_number: company && company.taxNumber,
          charge_tax: company && company.chargesTax,
          address_line1: company && company.location && company.location.addressLine1,
          address_line2: company && company.location && company.location.addressLine2,
          city: company && company.location && company.location.city,
          state: company && company.location && company.location.state,
          zip: company && company.location && company.location.postcode,
          country: company && company.location && company.location.country,
          phone: company && company.contactInfo && company.contactInfo.phone,
          user_id: company && company.user && company.user.id,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.companies && new CompanyNormalizer( response.data.companies ).normalize(),
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async getItems({ options }) {
    /* Get a list of items from Assembly */
    try {
      const response = await axios({
        method: 'get',
        url: `${this.getURL()}/items`,
        auth: this.getOptions().auth,
        params: options,
      });

      /* Standardise the response */
      return {
        status: 200,
        data: {
          items: response.data.items && response.data.items.map( c => new ItemNormalizer( c ).normalize()),
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

  async createItem({ item }) {
    /* Creates an item */
    try {
      const response = await axios({
        method: 'post',
        url: `${this.getURL()}/items`,
        auth: this.getOptions().auth,
        data: {
          id: item && item.id,
          name: item && item.name,
          amount: item && item.amount,
          currency: item && item.currency,
          payment_type: new ItemNormalizer().getReversePaymentType( item.paymentType ),
          buyer_id: item && item.buyer && item.buyer.id,
          seller_id: item && item.seller && item.seller.id,
          fee_ids: item && item.fees && item.fees.join( ',' ),
          description: item && item.description,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.items && new ItemNormalizer( response.data.items ).normalize(),
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async getItem({ id }) {
    /* Get the company with the specified ID from Assembly */
    try {
      const response = await axios({
        method: 'get',
        url: `${this.getURL()}/items/${id}`,
        auth: this.getOptions().auth,
      });

      /* Standardise the response */
      return {
        status: 200,
        data: {
          items: response.data.items && new ItemNormalizer( response.data.items ).normalize(),
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

  async getTokens({ type, user }) {
    /* Get the token */
    try {
      const response = await axios({
        method: 'post',
        url: `${this.getURL()}/token_auths`,
        auth: this.getOptions().auth,
        data: {
          token_type: type,
          user_id: user && user.id,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.token_auth && new TokenNormalizer( response.data.token_auth ).normalize(),
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async makeItemPayment({ id, account, ipAddress, deviceID }) {
    /* Makes a payment on the specified item */
    try {
      const response = await axios({
        method: 'patch',
        url: `${this.getURL()}/items/${id}/make_payment`,
        auth: this.getOptions().auth,
        data: {
          id: id,
          account_id: account && account.id,
          ip_address: ipAddress,
          deviceID: deviceID,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.items && new ItemNormalizer( response.data.items ).normalize(),
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async releaseItemPayment({ id }) {
    /* Makes a payment on the specified item */
    try {
      const response = await axios({
        method: 'patch',
        url: `${this.getURL()}/items/${id}/release_payment`,
        auth: this.getOptions().auth,
        data: {
          id: id,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.items && new ItemNormalizer( response.data.items ).normalize(),
      };
    } catch ( e ) {
      return {
        status: e.response ? e.response.status : 500,
        data: e.response ? e.response.data : { error: 'An unexpected error has occured' },
      };
    }
  }

  async createFee({ name, type, amount, cap, min, max, to }) {
    /* Creates a fee */
    try {
      const response = await axios({
        method: 'post',
        url: `${this.getURL()}/fees`,
        auth: this.getOptions().auth,
        data: {
          name,
          fee_type_id: type,
          amount,
          cap,
          min,
          max,
          to,
        },
      });

      /* Standardise the response */
      return {
        status: 200,
        data: response.data.fees && new FeeNormalizer( response.data.fees ).normalize(),
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
