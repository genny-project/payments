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
  }

  /* Returns the ID of the tenant */
  getID() {
    return this._data.id ? this._data.id.trim() : null;
  }

  /* Returns the name of the tenant */
  getName() {
    return this._data.name ? this._data.name.trim() : null;
  }

  /* Returns payment provider information */
  getProviders() {
    return this._data.providers;
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
      providers: Object.keys( this.getProviders ),
    };
  }

  /* Checks the provided token and secret, returning true if correct and false if incorrect */
  checkAuthToken( token, secret ) {
    return this.getAccessTokens().find( a => a.token === token && a.secret === secret ) != null;
  }

  /* Validate the data to see whether it is valid */
  validate( logErrors = false ) {
    /* Check that an ID was provided */
    if ( !this.getID() || this.getID() === '' ) {
      logErrors && Logger.error( 'Tenant must have an ID defined.' );
      return false;
    }

    /* Check that a name was provided */
    if ( !this.getName() || this.getName() === '' ) {
      logErrors && Logger.error( `Tenant with ID: ${this.getID()} must have a name defined.` );
      return false;
    }

    /* Check that a type was provided */
    if ( !this.getType() || this.getType() === ''  ) {
      logErrors && Logger.error( `Tenant with ID: ${this.getID()} must have a type defined.` );
      return false;
    }

    /* Check that the type provided is a valid type */
    if ( !TenantType[this.getType()] ) {
      logErrors && Logger.error( `Tenant with ID: ${this.getID()} has invalid type: ${this.getType()}. Valid types are ${Object.keys( TenantType ).join( ', ' )}.` );
      return false;
    }

    return true;
  }
}

module.exports = Tenant;
