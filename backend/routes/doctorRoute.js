const express = require('express');
const { doctorsList, loginDoctor, appointmentsDoctor } = require('../controller/doctorController');
const authDoctor = require('../middlewares/authDoctor');
const doctorRouter = express.Router();


doctorRouter.get('/list',doctorsList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)


module.exports = doctorRouter