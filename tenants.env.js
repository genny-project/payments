module.exports = [
  {
    name: 'TestMarketplace',
    id: process.env.PAYMENT_MARKETPLACE_NAME,
    type: 'marketplace',
    notifications: [
      process.env.PAYMENTS_EMAIL
    ],
    providers: {
      assembly: {
        environment: process.env.PAYMENT_MARKETPLACE_NAME,
        currencies: ['AUD'],
        options: {
          auth: {
            username: process.env.PAYMENTS_EMAIL,
            password: process.env.PAYMENTS_PASSWORD
          }
        }
      },
      ripple: {
        environment: 'test',
        currencies: ['XRP'],
        options: {
          address: 'sdasdasd'
        }
      }
    },
    accessTokens: [
      {
        'token': process.env.PAYMENT_TOKEN,
        'secret': process.env.PAYMENT_SECRET
      }
    ]
  }
];
