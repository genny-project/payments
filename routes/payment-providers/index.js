/* Include dependencies */
const API = require( '../../helpers/api/API' );
const { PaymentProviderFactory } = require( '../../factories' );

/* Returns a list of all the loaded payment providers */
API.get( '/payment-providers', async ( req, res ) => {
  res.json( Object.keys( PaymentProviderFactory.getProviders()));
});
