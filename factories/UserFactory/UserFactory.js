/* Include dependencies */
const { User } = require( '../../models' );

class UserFactory {
  async getUserByEmail( email, populate ) {
    return User.findOne({ email }, populate ).exec();
  }

  async getUserByID( id, populate ) {
    return User.findOne({ _id: id }, populate ).exec();
  }

  async getAllUsers( options, populate ) {
    return User.find({}, populate, options ).exec();
  }

  async getUserCount() {
    return User.count();
  }

  async saveUser( user ) {
    return await user.save();
  }
}

/* Figure out which Factory to load depending on whether or not we are testing */
module.exports = new UserFactory();
