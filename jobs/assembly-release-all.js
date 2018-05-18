const axios = require( 'axios' );

const ASSEMBLY_URL = 'https://secure.api.promisepay.com';

module.exports = function run( ASSEMBLY_USERNAME, ASSEMBLY_PASSWORD ) {
  let active = 0;

  /* Make a reqyest to Assembly to get all of the disbursements */
  function getUsers( results = [], start, limit, callback ) {
    axios.get( `${ASSEMBLY_URL}/users?offset=${start}&limit=${limit}`, { auth: { username: ASSEMBLY_USERNAME, password: ASSEMBLY_PASSWORD }}).then( result => {
      result.data.users.forEach( item => {
        results.push( item );
      });

      console.log( `Fetched ${results.length} users` );

      if ( results.length < result.data.meta.total ) {
        return getUsers( results, start + limit, limit, callback );
      } else {
        callback( results );
      }
    }).catch( error => {
      console.error( error );
    });
  }

  /* Get the users */
  getUsers( [], 0, 200, users => {
    /* Check wallet accounts */
    checkWalletAccounts( users );

    console.log( `Got ${users.length} users` );
  });

  function checkWalletAccounts( users ) {
    for ( let i = 0; i < users.length; i++ ) {
      getWalletAccountBalance( users[i] ).then( balance => {
        if ( balance > 10000 ) {
          console.log( `${users[i].id},${users[i].full_name},${balance}` );
          console.log( 'Releasing funds' );
          releaseFundsForUser( users[i].id );
        }
      });
    }
  }

  async function getWalletAccountBalance( user ) {
    while( active > 100 ) {
      await sleep( 100 );
    }
    active++;
    const response = await axios.get( `${ASSEMBLY_URL}/users/${user.id}/wallet_accounts`, { auth: { username: ASSEMBLY_USERNAME, password: ASSEMBLY_PASSWORD }});
    active--;
    return response.data.wallet_accounts.balance;
  }

  async function sleep( time ) {
    return new Promise( resolve => {
      setTimeout( resolve, time );
    });
  }

  async function releaseFundsForUser( userID ) {
    /* Get the user */
    const user = await axios.get( `${ASSEMBLY_URL}/users/${userID}`, { auth: { username: ASSEMBLY_USERNAME, password: ASSEMBLY_PASSWORD }});
    const userData = user.data.users;
    const payoutAccountID = userData.related.payout_account;
    console.log( userData.full_name );
    console.log( 'Payout account: ', payoutAccountID );

    /* Get the users wallet account */
    const wallet = await axios.get( `${ASSEMBLY_URL}/users/${userID}/wallet_accounts`, { auth: { username: ASSEMBLY_USERNAME, password: ASSEMBLY_PASSWORD }});
    const walletData = wallet.data.wallet_accounts;

    console.log( 'Wallet account: ', walletData.id );
    console.log( 'Wallet balance: ', walletData.balance );

    console.log( 'Releasing' );
    try {
      const release = await axios.post( `${ASSEMBLY_URL}/wallet_accounts/${walletData.id}/withdraw`, { id: walletData.id, account_id: payoutAccountID, amount: walletData.balance }, { auth: { username: ASSEMBLY_USERNAME, password: ASSEMBLY_PASSWORD }});
      console.log( release.data );
    } catch ( e ) {
      console.log( e.response.data.errors );
    }
  }
}
