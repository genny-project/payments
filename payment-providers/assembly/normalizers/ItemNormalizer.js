class ItemNormalizer {
  constructor( data ) {
    this.data = data;
  }

  getPaymentType( type ) {
    switch( type ) {
      case 1:
        return 'escrow';
      case 2:
        return 'express';
      case 3:
        return 'escrow_partial_release';
      case 4:
        return 'approve';
    }
  }

  getReversePaymentType( type ) {
    switch( type ) {
      case 'escrow':
        return 1;
      case 'express':
        return 2;
      case 'escrow_partial_release':
        return 3;
      case 'approve':
        return 4;
    }
  }

  normalize() {
    return {
      id: this.data.id,
      description: this.data.description,
      createdOn: this.data.created_on,
      updatedOn: this.data.updated_on,
      state: this.data.state,
      paymentType: this.getPaymentType( this.data.payment_type_id ),
      amount: this.data.amount,
      currency: this.data.currency,
      depositReference: this.data.deposit_reference,
      buyer: {
        fullName: this.data.buyer_name,
        contactInfo: {
          email: this.data.buyer_email,
        },
        location: {
          country: this.data.buyer_country,
        }
      },
      seller: {
        fullName: this.data.seller_name,
        contactInfo: {
          email: this.data.seller_email,
        },
        location: {
          country: this.data.seller_country,
        }
      }
    };
  }
}

module.exports = ItemNormalizer;
