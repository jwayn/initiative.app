const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.tokenData = decodedToken;
    } catch (err) {
        console.log(err);
        next(err);
    }
    next();
}