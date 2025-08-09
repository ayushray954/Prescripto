const mongoose  = require('mongoose');
require('dotenv').config();


const dbConnect = async ()=>{
     mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Db connected successfully");
     }).catch((err)=>{
        console.log(err);
     })
}

module.exports = dbConnect
