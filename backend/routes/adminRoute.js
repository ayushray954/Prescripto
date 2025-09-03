const express = require('express');
const {addDoctor,loginAdmin, allDoctor, allAppointment, cancelAppointemnt, adminDashboard} = require('../controller/adminController.js')
const upload = require('../middlewares/multer.js')
const authAdmin = require('../middlewares/Auth.js');
const {changeAvailability} = require('../controller/doctorController.js');
const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctor)
adminRouter.post('/chage-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,allAppointment)
adminRouter.post('/cancel-appointment',authAdmin, cancelAppointemnt);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

module.exports = adminRouter;