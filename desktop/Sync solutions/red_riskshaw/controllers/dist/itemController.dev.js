"use strict";

var jwt = require('jsonwebtoken');

var Item = require('../models/user');

var bcrypt = require('bcryptjs');

require('dotenv').config();

function registerUser(req, res) {
  var _req$body, name, phone, role, password, existingUser, saltRounds, salt, hashedPassword, newItem, savedItem, token;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, phone = _req$body.phone, role = _req$body.role, password = _req$body.password;

          if (!(!name || !phone || !role || !password)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            status: 0,
            message: "Some Fields Are missing "
          }));

        case 4:
          if (!(phone.length != 10)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            status: 0,
            message: "Phone number must be 10 digits"
          }));

        case 6:
          if (!(typeof password !== 'string' || password.trim() === '')) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            status: 0,
            message: "Password must be a non-empty string."
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(Item.findOne({
            phone: phone
          }));

        case 10:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 14;
            break;
          }

          console.log(existingUser.role);
          return _context.abrupt("return", res.status(400).json({
            status: 0,
            message: "Phone number is already registered ".concat(existingUser.role, "  ")
          }));

        case 14:
          saltRounds = 10;
          _context.next = 17;
          return regeneratorRuntime.awrap(bcrypt.genSalt(saltRounds));

        case 17:
          salt = _context.sent;
          _context.next = 20;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 20:
          hashedPassword = _context.sent;
          newItem = new Item({
            name: name,
            phone: phone,
            role: role,
            password: hashedPassword
          });
          _context.next = 24;
          return regeneratorRuntime.awrap(newItem.save());

        case 24:
          savedItem = _context.sent;
          token = jwt.sign({
            id: savedItem._id,
            role: savedItem.role
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.status(201).json({
            status: 1,
            message: "user created successfully",
            token: token,
            user: savedItem
          });
          _context.next = 33;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](0);
          console.error({
            status: 0,
            message: _context.t0,
            user: []
          });
          res.status(500).json({
            message: "Internal server error."
          });

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 29]]);
}

function loginUser(req, res) {
  var _req$body2, phone, password, user, isMatch, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, phone = _req$body2.phone, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Item.findOne({
            phone: phone
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            status: 0,
            message: "Something Went Wrong"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            status: 0,
            message: "Invalid credentials."
          }));

        case 12:
          token = jwt.sign({
            id: user._id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: '21h'
          });
          res.status(200).json({
            status: 1,
            message: "Login has done Successfully",
            user: user,
            token: token
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error({
            status: 0,
            message: "Something went wrong",
            error: _context2.t0
          });
          res.status(500).json({
            message: "Internal server error."
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}

;

function fetchAllUsers(req, res) {
  var items;
  return regeneratorRuntime.async(function fetchAllUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Item.find());

        case 3:
          items = _context3.sent;
          res.status(200).json({
            status: 1,
            message: "All users are fetched Successfully",
            data: items
          });
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error({
            status: 0,
            message: _context3.t0
          });
          res.status(500).json({
            message: "Internal server error."
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

;
module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  fetchAllUsers: fetchAllUsers
};