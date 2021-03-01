const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json("Token is required.");
    } else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json("invalid token");
            } else {
                req.decodedToken = decoded; //req.decodedToken.id to reach authorized user`s ID
                next();
            }
        });
    }
};
