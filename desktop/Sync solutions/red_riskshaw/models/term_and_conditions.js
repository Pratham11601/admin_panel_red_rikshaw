const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const itemSchema = new mongoose.Schema({
    sr_no: {
        type: Number,
        unique: true 
    },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

itemSchema.plugin(AutoIncrement, { inc_field: 'sr_no' });

module.exports = mongoose.model('TermsCondn', itemSchema);
