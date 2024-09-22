const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    role: { type: String, required: true },
    password: { 
        type: String,
        required: true,
        default:"no password"
        
        },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', itemSchema);
