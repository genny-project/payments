class PaymentAuthorityNormalizer {
  constructor( data ) {
    this.data = data;
  }

  normalize() {
    const auth = this.data;

    return {
      id: auth.id,
      createdAt: auth.created_at,
      createdOn: auth.created_on,
      amount: auth.amount,
      state: auth.state,
    };
  }
}

module.exports = PaymentAuthorityNormalizer;
