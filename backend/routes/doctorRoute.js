const express = require('express');
const { doctorsList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile } = require('../controller/doctorController');
const authDoctor = require('../middlewares/authDoctor');
const doctorRouter = express.Router();


doctorRouter.get('/list',doctorsList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete )
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel )
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

module.exports = doctorRouter