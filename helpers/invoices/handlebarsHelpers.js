/* Include dependencies */
const moment = require( 'moment' );
const currencyFormatter = require( 'currency-formatter' );

class HandleBarsHelpers {
  register( handlebars ) {
    /* Left pads numbers with the required numbers of 0 */
    handlebars.registerHelper( 'leftpad', ( pad, value ) => {
      if ( value == null || value === '' ) {
        return '';
      }
      return value.toString().padZero( pad );
    });

    String.prototype.padZero= function( len, c ){
        var s= this, c= c || '0';
        while( s.length< len ) s= c+ s;
        return s;
    };

    /* Converts any data value to a date in the DD/MM/YYYY format */
    handlebars.registerHelper( 'nicedate', value => {
      if ( value == null || value === '' ) {
        return '';
      }

      return moment( value ).format( 'DD/MM/YYYY' );
    });

    /* Converts a dollar amount in cents to a normal formatted amount ($0.00) */
    handlebars.registerHelper( 'money', value => {
      if ( value == null || value === '' ) {
        return '$0.00';
      }

      return this.formatCurrency( value / 100 );
    });
  }

  formatCurrency( currency ) {
    return currencyFormatter.format( currency, {
      code: 'AUD',
    });
  }
}

module.exports = new HandleBarsHelpers();
