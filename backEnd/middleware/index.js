const jwt = require("jsonwebtoken");
//require("dotenv").config();

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "15m", // Set the expiration time for the access token
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET_KEY);
};

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")?.[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                // Token has expired
                return res.status(403).json({ message: "Token has expired" });
            } else {
                // Other token verification errors
                return res.status(401).json({ message: "Invalid token" });
            }
        }
        req.user = decoded;
        next();
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    authenticateUser,
};