const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "Access denied. Token not provided.",
    });
  }

  const bearer = token.split(" ");
  const bearerToken = bearer[1];

  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.send({ success: false, msg: "invalid token" });
  

       const branch_id = req.params.branch_id; 
       if (branch_id) {
           user.branch_id = branch_id;
       }

       req.user = user;
       next();
    });
}
module.exports = verifyToken;
