const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

exports.login = async (req, res) => {
    const { phone, password } = req.body;

    try {
        if (!phone || !password) {
            return res.status(400).json({ status: 0, message: "Please enter both phone and password." });
        }

        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({ status: 0, message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: 0, message: "Password incorrect." });
        }

        const token = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: '24h' 
        });

        res.status(200).json({ auth: true, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ status: 0, message: "Internal server error." });
    }
};