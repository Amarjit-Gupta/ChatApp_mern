require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DATABASE_URL;

    mongoose.connect(DB_URL).then(()=>{
        console.log("database connected.");
    }).catch((err)=>{
        console.log("database not connect",err);
    });

const userSchema = new mongoose.Schema({
    username: String,
    message: String,
    image: String,
    join: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("fourthprojects", userSchema);