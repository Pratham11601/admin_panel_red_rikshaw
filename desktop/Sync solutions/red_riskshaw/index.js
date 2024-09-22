const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authroutes');
const itemRoutes = require('./routes/user');
const termscondn = require('./routes/terms_condn');
const privacyPolicy = require('./routes/privacy_policy');

const app = express();

app.use(bodyParser.json());


app.use('/auth', authRoutes);
app.use('/api', itemRoutes); 
app.use('/api/terms',termscondn );  
app.use('/api/privacypolicy',privacyPolicy );  




mongoose.connect('mongodb+srv://syncsolutions:Steve%401106@cluster0.yqvy4.mongodb.net/')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});




