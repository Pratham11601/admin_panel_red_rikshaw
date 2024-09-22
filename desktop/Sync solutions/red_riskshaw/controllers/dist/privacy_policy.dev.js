"use strict";

var express = require('express');

var router = express.Router();

var PrivacyPolicy = require('../models/privacy_policy'); // Fetch all privacy policies


function fetchAllPolicies(req, res) {
  var policies;
  return regeneratorRuntime.async(function fetchAllPolicies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(PrivacyPolicy.find());

        case 3:
          policies = _context.sent;
          res.status(200).json({
            status: true,
            message: 'Successfully fetched privacy policies.',
            data: policies
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching privacy policies:", _context.t0);
          res.status(500).json({
            message: "Internal server error."
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // Create a new privacy policy


function createPolicy(req, res) {
  var content, newPolicy, savedPolicy;
  return regeneratorRuntime.async(function createPolicy$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          content = req.body.content;

          if (content) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Content is required."
          }));

        case 3:
          _context2.prev = 3;
          newPolicy = new PrivacyPolicy({
            content: content
          });
          _context2.next = 7;
          return regeneratorRuntime.awrap(newPolicy.save());

        case 7:
          savedPolicy = _context2.sent;
          res.status(201).json(savedPolicy);
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](3);
          console.error("Error saving privacy policy:", _context2.t0);
          res.status(500).json({
            message: "Internal server error."
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 11]]);
}

module.exports = {
  fetchAllPolicies: fetchAllPolicies,
  createPolicy: createPolicy
};