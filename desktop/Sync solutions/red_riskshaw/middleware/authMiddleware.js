const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';
const apiKey = 'w3rvs587hbdt9ugs6YvD3K0bgDtPl'; 



function verifyToken(req, res, next) {
    const apiKeyHeader = req.headers['api-key'];
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!apiKeyHeader || apiKeyHeader !== apiKey) {
        return res.status(403).json({ message: "Invalid or missing API key." });
    }

    if (!token) {
        return res.status(403).json({ message: "No token provided." });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token." });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
