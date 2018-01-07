/* Include dependencies */
const Logger = require( '../logging/Logger' );
const { Tenant } = require( '../../models' );

class TenantConfigLoader {
  constructor() {
    /* Define default data */
    this.tenants = [];

    /* Attempt to load the configuration from file */
    try {
      this.config = require( '../../tenants.js' );
      Logger.info( 'Tenant configuration file loaded successfully' );

      /* Attempt to validate all the tenants in the configuration file straight away */
      this.config.forEach( tenant => {
        if ( !this.validate( tenant, true )) {
          Logger.error( 'Failed to validate tenant' );
        } else {
          Logger.info( `Successfully valided tenant with ID: ${tenant.id}` );

          /* Store the tenant */
          this.tenants.push( new Tenant( tenant ));
        }
      });
    } catch ( e ) {
      /* An error occured loading the configuration file, load an error and continue */
      Logger.error( 'Failed to load tenant configuration file', e );
      this.config = [];
    }
  }

  /* Validates the provided tenant data */
  validate( data, logErrors = false ) {
    if ( !data ) {
      return false;
    }

    /* Validate and log errors */
    return new Tenant( data ).validate( logErrors );
  }

  getTenant( id ) {
    /* Check to see whether this tenant exists */
    const tenant = this.tenants.find( tenant => tenant.getID() === id );
  
    return tenant;
  }

  /* Returns all the loaded and validated tenants */
  getAll() {
    return this.tenants;
  }
}

module.exports = new TenantConfigLoader();
