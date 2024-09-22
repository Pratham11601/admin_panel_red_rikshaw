const express = require('express');
const router = express.Router();
const PrivacyPolicy = require('../models/privacy_policy'); 

// Fetch all privacy policies
async function fetchAllPolicies(req, res) {
    try {
        const policies = await PrivacyPolicy.find();
        
        res.status(200).json({
            status: true,
            message: 'Successfully fetched privacy policies.',
            data: policies,
        });
    } catch (error) {
        console.error("Error fetching privacy policies:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

// Create a new privacy policy
async function createPolicy(req, res) {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required." });
    }

    try {
        const newPolicy = new PrivacyPolicy({ content });
        const savedPolicy = await newPolicy.save();
        res.status(201).json(savedPolicy);
    } catch (error) {
        console.error("Error saving privacy policy:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    fetchAllPolicies,
    createPolicy
};
