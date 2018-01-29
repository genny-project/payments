/* Include dependencies */
const API = require( '../../helpers/api/API' );
const securedRoute = require( '../../middlewares/auth/securedRoute' );

/* Returns a list of all the items on the system */
API.get( '/:provider/items', securedRoute, async ( req, res ) => {
  /* Get the tenant who made this request */
  const tenant = req.tenant;

  /* Get the provider ID */
  const providerID = req.params.provider;

  /* Get the provider */
  const provider = tenant.getProvider( providerID );

  /* Check that the provider exists */
  if ( !provider ) {
    res.status( 404 );
    res.json({ error: 'Provider not found.' });
    return;
  }

  /* Get a list of items */
  try {
    const response = await provider.getItems({ options: req.query });

    /* Set the status and return the response */
    res.status( response.status );
    res.json( response.data );
    return;
  } catch ( e ) {
    /* There was an error */
    res.status( e.status );
    res.json( e.data );
    return;
  }
});

/* Creates a item */
API.post( '/:provider/items', securedRoute, async( req, res ) => {
  /* Get the tenant who made this request */
  const tenant = req.tenant;

  /* Get the provider ID */
  const providerID = req.params.provider;

  /* Get the provider */
  const provider = tenant.getProvider( providerID );

  /* Check that the provider exists */
  if ( !provider ) {
    res.status( 404 );
    res.json({ error: 'Provider not found.' });
    return;
  }

  /* Creates the item */
  try {
    const response = await provider.createItem({ item: req.body });

    /* Set the status and return the response */
    res.status( response.status );
    res.json( response.data );
    return;
  } catch ( e ) {
    /* There was an error */
    res.status( e.status );
    res.json( e.data );
    return;
  }
});

/* Gets the item with the specified ID */
API.get( '/:provider/items/:id', securedRoute, async( req, res ) => {
  /* Get the tenant who made this request */
  const tenant = req.tenant;

  /* Get the provider ID */
  const providerID = req.params.provider;

  /* Get the provider */
  const provider = tenant.getProvider( providerID );

  /* Check that the provider exists */
  if ( !provider ) {
    res.status( 404 );
    res.json({ error: 'Provider not found.' });
    return;
  }

  /* Get the company with the specified ID */
  try {
    const response = await provider.getItem({ id: req.params.id });

    /* Set the status and return the response */
    res.status( response.status );
    res.json( response.data );
    return;
  } catch ( e ) {
    /* There was an error */
    res.status( e.status );
    res.json( e.data );
    return;
  }
});

/* Makes a payment on the specified item */
API.post( '/:provider/items/:id/payment', securedRoute, async ( req, res ) => {
  /* Get the tenant who made this request */
  const tenant = req.tenant;

  /* Get the provider ID */
  const providerID = req.params.provider;

  /* Get the provider */
  const provider = tenant.getProvider( providerID );

  /* Check that the provider exists */
  if ( !provider ) {
    res.status( 404 );
    res.json({ error: 'Provider not found.' });
    return;
  }

  /* Get the company with the specified ID */
  try {
    const response = await provider.makeItemPayment({ id: req.params.id , ...req.body });

    /* Set the status and return the response */
    res.status( response.status );
    res.json( response.data );
    return;
  } catch ( e ) {
    /* There was an error */
    res.status( e.status );
    res.json( e.data );
    return;
  }
});

/* Releases the payment on the specified item */
API.post( '/:provider/items/:id/release-payment', securedRoute, async ( req, res ) => {
  /* Get the tenant who made this request */
  const tenant = req.tenant;

  /* Get the provider ID */
  const providerID = req.params.provider;

  /* Get the provider */
  const provider = tenant.getProvider( providerID );

  /* Check that the provider exists */
  if ( !provider ) {
    res.status( 404 );
    res.json({ error: 'Provider not found.' });
    return;
  }

  try {
    const response = await provider.releaseItemPayment({ id: req.params.id });
    /* Set the status and return the response */
    res.status( response.status );
    res.json( response.data );
    return;
  } catch ( e ) {
    /* There was an error */
    res.status( e.status );
    res.json( e.data );
    return;
  }
});
