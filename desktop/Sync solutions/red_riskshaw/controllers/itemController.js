const jwt = require('jsonwebtoken');
const Item = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();


async function registerUser(req, res) {
    try {
        const { name, phone, role, password } = req.body;

        if (!name || !phone || !role || !password) {
            return res.status(400).json({ 
                status: 0,
                message: "Some Fields Are missing " });
        }

        if(phone.length != 10 ){

            return res.status(400).json({ 
                status: 0,
                message: "Phone number must be 10 digits" });

        }



        if (typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({
                status: 0,
                message: "Password must be a non-empty string." });
        }

        const existingUser = await Item.findOne({ phone });
        if (existingUser) {
            console.log(existingUser.role);

            return res.status(400).json({ 
                status: 0,
                message: `Phone number is already registered ${existingUser.role}  ` });
        }


        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newItem = new Item({
            name,
            phone,
            role,
            password: hashedPassword
        });

        const savedItem = await newItem.save();
        const token = jwt.sign({ id: savedItem._id, role: savedItem.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });


        res.status(201).json({ status: 1, message: "user created successfully", token ,user: savedItem});
    } catch (error) {
        console.error({
            status: 0, message: error, user: [],
        });
        res.status(500).json({ message: "Internal server error." });
    }
}









async function loginUser(req, res) {
    try {
        const { phone, password } = req.body;

        const user = await Item.findOne({ phone });
        if (!user) {
            return res.status(400).json({

                status: 0,
                message: "Something Went Wrong"


            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({


                status: 0,
                message: "Invalid credentials."
            });
        }


        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '21h'
        });

        res.status(200).json({

            status: 1,
            message: "Login has done Successfully",
            user: user, token
        });
    } catch (error) {
        console.error(

            {


                status: 0,
                message: "Something went wrong",
                error: error

            }


        );
        res.status(500).json({ message: "Internal server error." });
    }
};


async function fetchAllUsers(req, res) {
    try {
        const items = await Item.find();
        res.status(200).json(

            {

                status: 1,
                message: "All users are fetched Successfully",
                data: items


            }


        );
    } catch (error) {
        console.error(


            {
                status: 0,
                message: error
            }


        );
        res.status(500).json({ message: "Internal server error." });
    }
};


module.exports = {
    registerUser,
    loginUser,
    fetchAllUsers
};
