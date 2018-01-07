/* Include dependencies */
const { PaymentProviderFactory } = require( './factories' );

/* Include and load required payment providers here */
PaymentProviderFactory.loadPaymentProvider( 'assembly' );
PaymentProviderFactory.loadPaymentProvider( 'ripple' );

/* Include the routes */
require( './routes' );
