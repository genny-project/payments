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
        webhooks: {
          item: {
            url: process.env.REACT_APP_VERTX_SERVICE_API,
            format: 'genny',
            authentication: {
              config: {
                realm: process.env.PAYMENTS_WEBHOOK_AUTH_REALM,
                host: process.env.KEYCLOAKURL,
                clientSecret: process.env.PAYMENTS_WEBHOOK_AUTH_CLIENT_SECRET,
                resource: process.env.PAYMENTS_WEBHOOK_AUTH_RESOURCE,
                username: process.env.PAYMENTS_WEBHOOK_AUTH_USERNAME,
                password: process.env.PAYMENTS_WEBHOOK_AUTH_PASSWORD,
              }
            },
          },
        },
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
