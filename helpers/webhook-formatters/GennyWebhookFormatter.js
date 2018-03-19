class GennyWebhookFormatter {
  formatItemWebhook( data ) {
    let status = '';

    switch( data.items.state ) {
      case 'pending':
      case 'payment_required':
        status = 'ITEM_PAYMENT_PENDING';
        break;

      case 'wire_pending':
      case 'paypal_pending':
      case 'payment_pending':
      case 'payment_authorized':
        status = 'ITEM_PAYMENT_INCOMING';
        break;

      case 'payment_held':
      case 'fraud_hold':
      case 'voided':
        status = 'ITEM_PAYMENT_HELD';
        break;

      case 'payment_deposited':
      case 'work_completed':
        status = 'ITEM_PAYMENT_DEPOSITED';
        break;

      case 'problem_flagged':
      case 'problem_escalated':
      case 'problem_resolve_requested':
      case 'off_platform_chargedback':
        status = 'ITEM_PAYMENT_PROBLEM';
        break;

      case 'completed':
        status = 'ITEM_PAYMENT_COMPLETED';
        break;

      case 'cancelled':
        status = 'ITEM_PAYMENT_CANCELLED';
        break;

      case 'refunded':
      case 'refund_pending':
      case 'refund_flagged':
      case 'off_platform_refunded':
        status = 'ITEM_PAYMENT_REFUNDING';
        break;

      default:
        status = '';
        break;
    }

    return {
      msg_type: 'DATA_MSG',
      data_type: 'QDataPaymentsCallbackMessage',
      objectId: data.items.id,
      object_type: 'ITEM',
      object_status: status,
      object_message: data.items.state,
    };
  }
}

module.exports = new GennyWebhookFormatter();
