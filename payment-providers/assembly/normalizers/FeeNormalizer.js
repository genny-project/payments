class FeeNormalizer {
  constructor( data ) {
    this.data = data;
  }

  normalize() {
    const fee = this.data;

    return {
      id: fee.id,
      createdAt: fee.created_at,
      updatedAt: fee.updated_at,
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
