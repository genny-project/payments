class UserNormalizer {
  constructor( data ) {
    this.data = data;
  }

  normalize() {
    const user = this.data;
    return {
      id: user.id,
      personalInfo: {
        fullName: user.full_name,
        firstName: user.first_name,
        lastName: user.last_name,
        dob: user.dob,
        governmentNumber: user.government_number,
      },
      createdAt: new Date( user.created_at ),
      updatedAt: new Date ( user.updated_at ),
      contactInfo: {
        email: user.email,
        mobile: user.mobile,
      },
      location: user.location,
      payoutAccount: user.related && user.related.payout_account,
      kyc: {
        verificationStatus: user.verification_state,
        heldState: user.held_state,
      },
      roles: user.roles,
    };
  }
}

module.exports = UserNormalizer;
