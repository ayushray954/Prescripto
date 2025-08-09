const express = require('express');
const { doctorsList } = require('../controller/doctorController');
const doctorRouter = express.Router();


doctorRouter.get('/list',doctorsList)


module.exports = doctorRouter