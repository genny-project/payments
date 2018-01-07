/* Include dependencies */
const { User } = require( '../../models' );

class UserFactory {
  async getUserByEmail( tenant, email, populate ) {
    return User.findOne({ tenant, email }, populate ).exec();
  }

  async getUserByID( tenant, id, populate ) {
    return User.findOne({ _id: id, tenant }, populate ).exec();
  }

  async getAllUsers( tenant, options, populate ) {
    return User.find({ tenant }, populate, options ).exec();
  }

  async getUserCount( tenant ) {
    return User.count({ tenant });
  }

  async saveUser( user ) {
    return await user.save();
  }
}

/* Figure out which Factory to load depending on whether or not we are testing */
module.exports = new UserFactory();
