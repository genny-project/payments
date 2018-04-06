class RawWebhookFormatter {
  formatItemWebhook( data ) {
    return data;
  }

  async getRequestHeaders() {
    return {};
  }

  shouldSendUpstream() {
    return true;
  }
}

module.exports = new RawWebhookFormatter();
