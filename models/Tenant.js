const Logger = require( '../helpers/logging/Logger' );

class Tenant {
  constructor( data ) {
    this._data = {
      id: '',
      name: '',
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

  /* Returns the configuration information that is can be displayed publicly */
  getPublicInfo() {
    return {
      id: this.getID(),
      name: this.getName(),
      providers: Object.keys( this.getProviders ),
    };
  }

  /* Validate the data to see whether it is valid */
  validate( logErrors = false ) {
    /* Check that an ID was provided */
    if ( !this.getID() || this.getID() === '' ) {
      logErrors && Logger.error( 'Tenant must have ID' );
      return false;
    }

    /* Check that a name was provided */
    if ( !this.getName() || this.getName() === '' ) {
      logErrors && Logger.error( 'Tenant must have a name' );
      return false;
    }

    return true;
  }
}

module.exports = Tenant;
