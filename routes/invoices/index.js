/* Include dependencies */
const API = require( '../../helpers/api/API' );
const TemplateLoader = require( '../../helpers/invoices/templateLoader' );

API.get( '/invoices/templates', ( req, res ) => {
  res.json( TemplateLoader.getTemplates());
});

/* Renders the provided template as plain text with the specified data */
API.post( '/invoices/template/:template', ( req, res ) => {
  /* Load the template */
  TemplateLoader.loadTemplate( req.params.template, ( err, template ) => {
    /* If there was an error return it */
    if ( err ) {
      res.status( err.errorCode );
      res.json( err );
      return;
    }

    /* Render the template as plain text */
    template.renderAsText( req.body, ( err, text ) => {
      /* If there was an error return it */
      if ( err ) {
        res.status( err.errorCode );
        res.json( err );
        return;
      }

      /* Return the rendered document */
      res.end( text );
    });
  });
});

/* This is used for testing, returns a blank version of the provided template in PDF form */
API.get( '/invoices/template/:template/pdf', ( req, res ) => {
  /* Load the template */
  TemplateLoader.loadTemplate( req.params.template, ( err, template ) => {
    /* If there was an error return it */
    if ( err ) {
      res.status( err.errorCode );
      res.json( err );
      return;
    }

    /* Render the template as a PDF */
    template.renderAsPDF( req.query || {}, ( err, pdf ) => {
      /* If there was an error return it */
      if ( err ) {
        res.status( err.errorCode );
        res.json( err );
        return;
      }

      /* Return the rendered document */
      pdf.pipe( res );
    });
  });
});

API.get( '/invoices/template/:template/html', ( req, res ) => {
  /* Load the template */
  TemplateLoader.loadTemplate( req.params.template, ( err, template ) => {
    /* If there was an error return it */
    if ( err ) {
      res.status( err.errorCode );
      res.json( err );
      return;
    }

    /* Render the template as text */
    template.renderAsText( req.query || {}, ( err, text ) => {
      /* If there was an error return it */
      if ( err ) {
        res.status( err.errorCode );
        res.json( err );
        return;
      }

      /* Return the rendered document */
      res.end( text );
    });
  });
});

/* Returns the template rendering with the provided data in pdf form */
API.post( '/invoices/template/:template/pdf', ( req, res ) => {
  /* Load the template */
  TemplateLoader.loadTemplate( req.params.template, ( err, template ) => {
    /* If there was an error return it */
    if ( err ) {
      res.status( err.errorCode );
      res.json( err );
      return;
    }

    /* Render the template as a PDF */
    template.renderAsPDF( req.body, ( err, pdf ) => {
      /* If there was an error return it */
      if ( err ) {
        res.status( err.errorCode );
        res.json( err );
        return;
      }

      /* Return the rendered document */
      pdf.pipe( res );
    });
  });
});
