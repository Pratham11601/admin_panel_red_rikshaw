"use strict";

var jwt = require('jsonwebtoken');

var secretKey = 'your_secret_key';
var apiKey = 'w3rvs587hbdt9ugs6YvD3K0bgDtPl';

function verifyToken(req, res, next) {
  var apiKeyHeader = req.headers['api-key'];
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];

  if (!apiKeyHeader || apiKeyHeader !== apiKey) {
    return res.status(403).json({
      message: "Invalid or missing API key."
    });
  }

  if (!token) {
    return res.status(403).json({
      message: "No token provided."
    });
  }

  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      return res.status(500).json({
        message: "Failed to authenticate token."
      });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;