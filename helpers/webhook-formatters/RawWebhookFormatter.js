class RawWebhookFormatter {
  formatItemWebhook( data ) {
    return data;
  }

  async getRequestHeaders() {
    return {};
  }
}

module.exports = new RawWebhookFormatter();
