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
            password: 'YzQ2MzY4NTQ3ZThiNDc5ZTg4MTg3OTQ0NWFmYTUxOTI='
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
