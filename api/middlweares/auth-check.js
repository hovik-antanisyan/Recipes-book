const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.secret);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({message: 'Authentication failed.', success: false});
    }
};