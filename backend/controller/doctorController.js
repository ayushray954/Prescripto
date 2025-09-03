const Doctor = require("../model/doctorModel");
const Appointment = require('../model/appointmentModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await Doctor.findById(docId);
        await Doctor.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({
            success: true,
            message: 'Availablity changed'
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const doctorsList = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select(['-password', '-email'])
        console.log("Doctors from DB:", doctors);
        res.status(200).json({
            success: true,
            doctors
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'please provide the email or password'
            })
        }

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(401).json({
                success: false,
                message: 'invalid email'
            })
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'invalid password'
            })
        }

        const token = jwt.sign({ email: doctor.email, id: doctor._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.status(200).json({
            success: true,
            message:'login successfully',
            token
        })
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

const appointmentsDoctor = async(req, res)=>{
    try{
       const appointments = await Appointment.find({ docId: req.docId });
        res.json({
            success:true,
            appointments
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false, 
            message:error.message
        })
    }
}

module.exports = { changeAvailability, doctorsList, loginDoctor, appointmentsDoctor }