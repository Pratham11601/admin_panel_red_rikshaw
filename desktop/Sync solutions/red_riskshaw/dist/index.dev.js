"use strict";

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var authRoutes = require('./routes/authroutes');

var itemRoutes = require('./routes/user');

var termscondn = require('./routes/terms_condn');

var privacyPolicy = require('./routes/privacy_policy');

var app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/api', itemRoutes);
app.use('/api/terms', termscondn);
app.use('/api/privacypolicy', privacyPolicy);
mongoose.connect('mongodb+srv://syncsolutions:Steve%401106@cluster0.yqvy4.mongodb.net/').then(function () {
  console.log("Connected to MongoDB");
})["catch"](function (error) {
  console.error("Error connecting to MongoDB:", error);
});
var PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
  console.log("http://localhost:".concat(PORT));
});