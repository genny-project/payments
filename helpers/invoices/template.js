/* Include dependencies */
const handlebars = require( 'handlebars' );
const conversion = require( 'phantom-html-to-pdf' )({
  phantomPath: require( 'phantomjs-prebuilt' ).path,
  numberOfWorkers: 5,
});

/* Define template types */
const TemplateType = {
  HTML: 'html',
  IMAGE: 'image',
};

class Template {
  constructor() {
    this.id = null;
    this.type = null;
    this.templateData = null;
    this.handlebarsTemplate = null;
  }

  setID( id ) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setType( type ) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  /* Sets the data that contains the template */
  setTemplateData( data ) {
    this.templateData = data;

    /* If this is a HTML template then compile the handlebars template */
    if ( this.getType() === TemplateType.HTML ) {
      this.handlebarsTemplate = handlebars.compile( this.getTemplateData().toString());
    }
  }

  /* Returns the data that defines the template */
  getTemplateData() {
    return this.templateData;
  }

  /* Renders the provided template as plain text (if supported) */
  renderAsText( data, callback ) {
    /* Check that we are able to render this template as plain text */
    if ( this.getType() !== TemplateType.HTML ) {
      callback({ errorCode: 400, error: 'Plain text rendering is not supported for this template type' }, null );
      return;
    }

    /* Return the template rendered as plain text */
    callback( null, this.handlebarsTemplate( data ));
  }

  /* Renders an image using this template with the specified data (if supported) */
  renderAsImage( data, callback ) {
    callback({ errorCode: 400, error: 'Image rendering is not currently supported' }, null );
  }

  /* Renders a PDF from this template using the specified data */
  renderAsPDF( data, callback ) {
    /* Check that we are able to render this template as an image */
    if ( this.getType() !== TemplateType.HTML ) {
      callback({ errorCode: 400, error: 'Image rendering is not supported for this template type' }, null );
      return;
    }

    /* Get the html we will use to render the PDF with */
    const html = this.handlebarsTemplate({ ...data, now: new Date() });

    /* Render the html as a pdf, returning an errors that may occur */
    conversion({ html }, ( error, pdf ) => {
      /* If an error occured return the error */
      if ( error ) {
        callback({ errorCode: 500, error }, null );
        return;
      }

      /* Return the PDF */
      callback( null, pdf.stream );
    });
  }
}

module.exports = Template;
