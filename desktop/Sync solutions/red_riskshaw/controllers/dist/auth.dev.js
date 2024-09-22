"use strict";

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var config = require('../config/config');

var User = require('../models/user');

exports.login = function _callee(req, res) {
  var _req$body, phone, password, user, isPasswordValid, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, phone = _req$body.phone, password = _req$body.password;
          _context.prev = 1;

          if (!(!phone || !password)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            status: 0,
            message: "Please enter both phone and password."
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            phone: phone
          }));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            status: 0,
            message: "User not found."
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          isPasswordValid = _context.sent;

          if (isPasswordValid) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            status: 0,
            message: "Password incorrect."
          }));

        case 14:
          token = jwt.sign({
            id: user._id
          }, config.jwtSecret, {
            expiresIn: '24h'
          });
          res.status(200).json({
            auth: true,
            token: token
          });
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          console.error("Login error:", _context.t0);
          res.status(500).json({
            status: 0,
            message: "Internal server error."
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
};