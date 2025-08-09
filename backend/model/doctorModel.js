const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    speciality:{
        type:String,
        require:true
    },
    degree:{
        type:String,
        require:true
    },
    experience:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    about:{
        type:String,
        require:true
    },
    available:{
        type:Boolean,
        default:true
    },
    fees:{
        type:Number,
        require:true
    },
    address: {
    line1: { type: String, required: true },
    line2: { type: String, required: true }
  },
    slots_booked:{
        type:Object,
        default:{}
    },
    date:{
        type:Number,
        require:true
    },

},{minimize:false})


module.exports = mongoose.model('doctor',doctorSchema);

