const express = require('express');
const {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment} = require('../controller/userController');
const authUser = require('../middlewares/authUser');
const upload = require('../middlewares/multer');
const userRoute = express.Router();

userRoute.post('/register',registerUser);
userRoute.post('/login',loginUser);
userRoute.get('/get-profile',authUser,getProfile)
userRoute.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRoute.post('/book-appointment',authUser,bookAppointment)
userRoute.get('/appointment',authUser,listAppointment)
userRoute.post('/cancel-appointment',authUser, cancelAppointment)

module.exports = userRoute;