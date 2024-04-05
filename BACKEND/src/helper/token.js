
const jwt = require('jsonwebtoken');

const generateAccessToken = async(user) => {
  
    const email = user.email;
    const role = user.role;
    const expiration = 7 *24 * 60 * 60 * 1000;
    const token = jwt.sign({ email:email, role:role }, "secret", {
      expiresIn: expiration,
    });
    return {token: token,expiration: expiration}
  };

  module.exports = generateAccessToken;