const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  // Destructure the necessary properties from the user object
  const { email, role, _id, branch_id , branch_name,administration } = user;

  // Create the payload object using object shorthand
  const payload = { email, role, _id, branch_id, branch_name,administration };

  // Sign the token with the payload and secret key, setting an expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

  console.log("PAYLOAD",payload)

  // Return the token in an object
  return { token };
};

module.exports = generateAccessToken;
