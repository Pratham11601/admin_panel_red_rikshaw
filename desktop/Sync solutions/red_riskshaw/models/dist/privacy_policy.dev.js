"use strict";

var mongoose = require('mongoose');

var AutoIncrement = require('mongoose-sequence')(mongoose);

var Counter = require('../models/counter');

var itemSchema = new mongoose.Schema({
  sr_no: {
    type: Number,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
itemSchema.pre('save', function _callee(next) {
  var counter;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isNew) {
            _context.next = 5;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Counter.findByIdAndUpdate({
            _id: 'sr_no'
          }, {
            $inc: {
              sequence_value: 1
            }
          }, {
            "new": true,
            upsert: true
          }));

        case 3:
          counter = _context.sent;
          this.sr_no = counter.sequence_value;

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
module.exports = mongoose.model('PrivacyPolicy', itemSchema);