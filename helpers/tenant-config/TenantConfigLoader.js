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
      this.config.forEach( tenantData => {
        try {
          const tenant = new Tenant( tenantData );
          Logger.info( `Successfully validated tenant with ID: ${tenant.getID()}` );

          /* Store the tenant */
          this.tenants.push( tenant );
        } catch ( e ) {
          Logger.error( `Failed to load tenant. ${e}` );
        }
      });
    } catch ( e ) {
      /* An error occured loading the configuration file, load an error and continue */
      Logger.error( 'Failed to load tenant configuration file', e );
      this.config = [];
    }
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
