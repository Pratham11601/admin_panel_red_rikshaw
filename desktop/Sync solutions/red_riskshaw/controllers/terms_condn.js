const express = require('express');
const router = express.Router();
const TermsCondn = require('../models/term_and_conditions'); 


async function fetchAllTerms(req, res) {
    try {
        const terms = await TermsCondn.find();

        res.status(200).json({
            status: 1,
            message: 'Successfully fetched terms.',
            data: terms,
        });
        


    } catch (error) {
        console.error( {status: 0,
             message:error,
             data:[]
        });
        res.status(500).json({ message: "Internal server error." });
    }
}

async function createTerm(req, res) {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required." });
    }

    try {
        const newTerm = new TermsCondn({ content });
        const savedTerm = await newTerm.save();
        res.status(201).json(
            
            {
                status: true,
                message: 'Successfully fetched terms.',
                data: savedTerm,




                

            }
            );


    } catch (error) {
        console.error("Error saving term and condition:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    fetchAllTerms,
    createTerm
};
