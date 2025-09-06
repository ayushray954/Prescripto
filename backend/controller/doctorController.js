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

const appointmentComplete = async (req, res) =>{
    try{
        const docId = req.docId;
        const {appointmentId} = req.body

        const appointmentData = await Appointment.findById(appointmentId);
        if(appointmentData && appointmentData.docId == docId){
            await Appointment.findByIdAndUpdate(appointmentId,{isCompleted: true})
            return res.json({
                success:true,
                message:'Appointment completed'
            })
        }
        else{
            return res.json({
                success:false,
                message:'Mark failed'
            })
        }
    }
    catch(error){
        console.log(error);
        res.json({
            success:false, 
            message:error.message
        })
    }
}

const appointmentCancel = async (req, res) =>{
    try{
        const docId = req.docId;
        const {appointmentId} = req.body

        const appointmentData = await Appointment.findById(appointmentId);
        if(appointmentData && appointmentData.docId == docId){
            await Appointment.findByIdAndUpdate(appointmentId,{cancelled: true})
            return res.json({
                success:true,
                message:'Appointment cancelled'
            })
        }
        else{
            return res.json({
                success:false,
                message:'cancellation failed'
            })
        }
    }
    catch(error){
        console.log(error);
        res.json({
            success:false, 
            message:error.message
        })
    }
}

const doctorDashboard = async (req, res)=>{
    try{
        const docId = req.docId;
        const appointments = await Appointment.find({docId})
        let earning = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earning+=item.amount
            }
        })

        let patients = []
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earning,
            appointments:appointments.length,
            patients: patients.length,
            latestAppointment: appointments.reverse().slice(0,5)
        }

        res.json({
            success:true,
            dashData
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

const doctorProfile = async (req, res)=>{
    try{
        const docId = req.docId;
        const profileData = await Doctor.findById(docId).select('-password')
        res.json({
            success:true,
            profileData
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

const updateDoctorProfile = async (req, res)=>{
    try{
        const docId = req.docId
        const {fees, address, available} = req.body
        await Doctor.findByIdAndUpdate(docId,{fees,address,available})
        res.json({
            success:true,
            message:'profile updated'
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


module.exports = { changeAvailability, doctorsList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile }