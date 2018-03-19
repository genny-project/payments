class Formatters {
  getFormatter( type ) {
    if ( type === 'genny' ) {
      return require( './GennyWebhookFormatter' );
    }

    return require( './RawWebhookFormatter' );
  }
}

module.exports = new Formatters();
