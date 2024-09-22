const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Counter = require('../models/counter'); 

const itemSchema = new mongoose.Schema({
    sr_no: {
        type: Number,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

itemSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'sr_no' }, 
            { $inc: { sequence_value: 1 } }, 
            { new: true, upsert: true }
        );
        this.sr_no = counter.sequence_value;
    }
    next();
});

module.exports = mongoose.model('PrivacyPolicy', itemSchema);
