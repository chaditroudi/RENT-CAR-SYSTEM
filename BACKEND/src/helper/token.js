const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  // Destructure the necessary properties from the user object
  const { email, role, _id, branch_id , branch_name } = user;

  // Create the payload object using object shorthand
  const payload = { email, role, _id, branch_id, branch_name };

  // Sign the token with the payload and secret key, setting an expiration time
  const token = jwt.sign(payload, "secret", { expiresIn: '7d' });

  // Return the token in an object
  return { token };
};

module.exports = generateAccessToken;
