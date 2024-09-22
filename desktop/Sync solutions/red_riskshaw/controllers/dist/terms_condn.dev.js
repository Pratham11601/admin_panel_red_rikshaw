"use strict";

var express = require('express');

var router = express.Router();

var TermsCondn = require('../models/term_and_conditions');

function fetchAllTerms(req, res) {
  var terms;
  return regeneratorRuntime.async(function fetchAllTerms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(TermsCondn.find());

        case 3:
          terms = _context.sent;
          res.status(200).json({
            status: 1,
            message: 'Successfully fetched terms.',
            data: terms
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error({
            status: 0,
            message: _context.t0,
            data: []
          });
          res.status(500).json({
            message: "Internal server error."
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function createTerm(req, res) {
  var content, newTerm, savedTerm;
  return regeneratorRuntime.async(function createTerm$(_context2) {
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
          newTerm = new TermsCondn({
            content: content
          });
          _context2.next = 7;
          return regeneratorRuntime.awrap(newTerm.save());

        case 7:
          savedTerm = _context2.sent;
          res.status(201).json({
            status: true,
            message: 'Successfully fetched terms.',
            data: savedTerm
          });
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](3);
          console.error("Error saving term and condition:", _context2.t0);
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
  fetchAllTerms: fetchAllTerms,
  createTerm: createTerm
};