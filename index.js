/* Include dependencies */
const { PaymentProviderFactory } = require( './factories' );

/* Include the routes */
require( './routes' );

/* Include and load required payment providers here */
PaymentProviderFactory.loadPaymentProvider( 'assembly' );
PaymentProviderFactory.loadPaymentProvider( 'ripple' );
