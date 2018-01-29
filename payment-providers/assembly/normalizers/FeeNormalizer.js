class FeeNormalizer {
  constructor( data ) {
    this.data = data;
  }

  normalize() {
    const fee = this.data;

    return {
      name: fee.name,
      type: fee.fee_type_id,
      amount: fee.amount,
      cap: fee.cap,
      min: fee.min,
      max: fee.max,
      to: fee.to,
    };
  }
}

module.exports = FeeNormalizer;
