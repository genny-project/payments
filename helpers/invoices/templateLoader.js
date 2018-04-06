/* Include dependencies */
const fs = require( 'fs' );
const Template = require( './template' );

/* Load template configuration */
const templateConfig = require( '../../invoice-templates/templates.json' );

class TemplateLoader {
  constructor() {
    /* Create a variable to store the templates */
    this.templates = {};
  }

  /* Returns an object containing all of the templates and their configuration */
  getTemplates() {
    return templateConfig;
  }

  /* Returns the template config for a single template */
  getTemplateConfig( id ) {
    return this.getTemplates()[id];
  }

  /* Loads the file for the required template */
  loadTemplate( templateID, callback ) {
    /* Check we don't have already have the data for this template */
    if ( !this.templates[ templateID ] ) {
      /* Check that this template is a defined template */
      if ( !this.getTemplateConfig( templateID )) {
        /* Template doesn't exist, return an error */
        callback({ errorCode: 404, error: 'Template not found' }, null );
        return;
      }

      /* The template exists */
      const template = this.getTemplateConfig( templateID );

      /* Load the file specified in the template config */
      fs.readFile( './invoice-templates/' + template.file, ( err, data ) => {
        if ( err != null ) {
          callback({ errorCode: 500, error: 'Unable to load template file', rawError: err });
          return;
        }

        /* Create a new Template with the contents of this file */
        const t = new Template();
        t.setID( templateID );
        t.setType( template.type );
        t.setTemplateData( data );

        /* Save the newly created template in memory */
        this.templates[ templateID ] = t;

        /* Return the template */
        callback( null, this.templates[ templateID ] );
      });
    } else {
      /* We have already loaded this template so we can return it straight away */
      callback( null, this.templates[ templateID ] );
    }
  }
}

module.exports = new TemplateLoader();
