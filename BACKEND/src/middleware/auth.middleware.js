const jwt = require('jsonwebtoken');
const verifyToken = async(req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            success: false,
            msg: "Access denied. Token not provided."
        });
    }

    try {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];

        const decodedData = jwt.verify(bearerToken, "secret");

        req.user = decodedData;
        console.log("decoeded",decodedData)
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg:error.message
        });
    }

    return next();
};


module.exports = verifyToken