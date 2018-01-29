class TokenNormalizer {
  constructor( data ) {
    this.data = data;
  }

  normalize() {
    const token = this.data;

    return {
      type: token.token_type,
      token: token.token,
      user: {
        id: token.user_id
      }
    };
  }
}

module.exports = TokenNormalizer;
