const Logger = require( '../helpers/logging/Logger' );
const TenantType = require( './TenantType' );

class Tenant {
  constructor( data ) {
    this._data = {
      id: '',
      name: '',
      type: '',
      notifications: [],
      providers: {},
      accessTokens: [],
      ...data,
    };

    this.providers = {};

    /* Check that an ID was provided */
    if ( !this.getID() || this.getID() === '' ) {
      throw new Error( 'Tenant must have an ID definied' );
    }

    /* Check that a name was provided */
    if ( !this.getName() || this.getName() === '' ) {
      throw new Error( `Tenant with ID: ${this.getID()} must have a name defined.` );
    }

    /* Check that a type was provided */
    if ( !this.getType() || this.getType() === ''  ) {
      throw new Error( `Tenant with ID: ${this.getID()} must have a type defined.` );
    }

    /* Check that the type provided is a valid type */
    if ( !TenantType[this.getType()] ) {
      throw new Error( `Tenant with ID: ${this.getID()} has invalid type: ${this.getType()}. Valid types are ${Object.keys( TenantType ).join( ', ' )}.` );
    }

    /* Check that an array of payment providers was provided */
    if ( !this.getProviderConfig()) {
      throw new Error( `Tenant with ID: ${this.getID()} must have payment providers defined.` );
    }

    /* Check the data structure of each provider supplied */
    Object.keys( this.getProviderConfig()).forEach( providerID => {
      /* Get the provider with the specified ID */
      const provider = this.getProviderConfig()[providerID];

      /* Check that an environment was provided */
      if ( !provider.environment || provider.environment.trim() === ''  ) {
        throw new Error( `Payment provider with ID: ${providerID} must have an environment defined.` );
      }

      /* Check that an array of currencies was provided */
      if ( !provider.currencies || !provider.currencies.length  ) {
        throw new Error( `Payment provider with ID: ${providerID} must have an array of currencies defined with at least one currency present.` );
      }

      /* Check that options were provided */
      if ( !provider.options ) {
        throw new Error( `Payment provider with ID: ${providerID} must have options defined.` );
      }
    });

    /* Load the payment providers */
    this.loadPaymentProviders();
  }

  /* Returns the ID of the tenant */
  getID() {
    return this._data.id ? this._data.id.trim() : null;
  }

  /* Returns the name of the tenant */
  getName() {
    return this._data.name ? this._data.name.trim() : null;
  }

  /* Returns payment provider config information */
  getProviderConfig() {
    return this._data.providers;
  }

  /* Returns payment providers */
  getProviders() {
    return this.providers;
  }

  /* Returns tenant type information */
  getType() {
    return this._data.type;
  }

  /* Returns an array of access tokens */
  getAccessTokens() {
    return this._data.accessTokens;
  }

  /* Returns the configuration information that is can be displayed publicly */
  getPublicInfo() {
    return {
      id: this.getID(),
      name: this.getName(),
      providers: Object.keys( this.getProviders()),
    };
  }

  /* Checks the provided token and secret, returning true if correct and false if incorrect */
  checkAuthToken( token, secret ) {
    return this.getAccessTokens().find( a => a.token === token && a.secret === secret ) != null;
  }

  /* Attempt to load the defined payment providers */
  loadPaymentProviders() {
    Logger.info( `Attempting to load payment providers for tenant with ID: ${this.getID()}` );

    /* Don't load payment providers if they have already been loaded */
    if ( this.getProviders().length > 0 ) {
      Logger.info( `Payment providers already loaded for tenant with ID: ${this.getID()}` );
      return;
    }

    Logger.info( `Successfully loaded payment providers for tenant with ID: ${this.getID()}` );
  }
}

module.exports = Tenant;
