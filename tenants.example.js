module.exports = [
  {
    'name': 'ACME Corp',
    'id': 'acme-corp',
    'notifications': [
      'alerts@example.com'
    ],
    'providers': {
      'assembly': {
        'environment': 'test',
        'auth': {
          'username': 'payments@example.com',
          'password': 'roadrunner'
        }
      },
      'xrp': {
        'environment': 'test',
        'address': 'rst4UovrQADinerk7D6Biw6UjaLu1dWDro'
      }
    },
    'accessTokens': [
      {
        'token': 'ne9TnIA39JwbJz48QOfN1ER55egc5etA',
        'secret': 'UdZ5fx63LyJUBpfKw0EEkHXF7FD60FxO'
      }
    ]
  }
];
