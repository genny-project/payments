class CompanyNormalizer {
  constructor( data ) {
    this.data = data;
  }

  normalize() {
    const company = this.data;

    return {
      legalName: company.legal_name,
      name: company.name,
      id: company.id,
      taxNumber: company.tax_number,
      chargesTax: company.charge_tax,
      location: {
        id: company.related.address,
      },
      contactInfo: {
        phone: company.phone,
      },
      user: {
        id: company.user_id
      }
    };
  }
}

module.exports = CompanyNormalizer;
