module.exports = [
  {
    name: 'ACME Corp',
    id: 'acme-corp',
    type: 'marketplace',
    notifications: [
      'alerts@example.com'
    ],
    providers: {
      assembly: {
        environment: 'test',
        currencies: ['AUD'],
        options: {
          auth: {
            username: 'payments@example.com',
            password: 'roadrunner'
          }
        }
      },
      ripple: {
        environment: 'test',
        currencies: ['XRP'],
        options: {
          address: 'rst4UovrQADinerk7D6Biw6UjaLu1dWDro'
        }
      }
    },
    accessTokens: [
      {
        'token': 'ne9TnIA39JwbJz48QOfN1ER55egc5etA',
        'secret': 'UdZ5fx63LyJUBpfKw0EEkHXF7FD60FxO'
      }
    ]
  }
];
