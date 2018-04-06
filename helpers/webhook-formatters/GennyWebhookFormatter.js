/* Include dependencies */
const axios = require( 'axios' );
const querystring = require( 'querystring' );

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

  async getRequestHeaders({ authentication }) {
    /* Create request config */
    const body = {
      grant_type: 'password',
      client_id: authentication.config.resource,
      username: authentication.config.username,
      password: authentication.config.password,
      client_secret: authentication.config.clientSecret,
    };

    /* Now we have the authentication config lets create a keycloak token */
    const response = await axios.post( `${authentication.config.host}/auth/realms/${authentication.config.realm}/protocol/openid-connect/token`, querystring.stringify( body ));

    return { Authorization: `Bearer ${response.data.access_token}` };
  }

  shouldSendUpstream( body ) {
    return body.items != null;
  }
}

module.exports = new GennyWebhookFormatter();
