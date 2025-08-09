const validator = require('validator')
const bcrypt = require('bcrypt');
const User = require('../model/userModel')
const Doctor = require('../model/doctorModel')
const Appointment = require('../model/appointmentModel')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const razorpay = require('razorpay')
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            })
        }
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "enter a valid email"
            })
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'password should be min 8 character'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPassword
        })

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)

        return res.status(200).json({
            success: true,
            message: "user created successfully",
            token
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'user not created',
            error: error.message
        })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: 'user does not exits'
            })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (verifyPassword) {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
            return res.json({
                success: true,
                message: 'login successfully',
                token
            })
        }
        else {
            return res.json({
                success: false,
                message: 'invalid credential'
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.userId; 
        const user = await User.findById(userId).select('-password'); 

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({
                success: false,
                message: 'data missing'
            });
        }

        const updateData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        };
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image'
            });
            updateData.image = imageUpload.secure_url;
        }

        await User.findByIdAndUpdate(req.userId, updateData);

        res.json({
            success: true,
            message: 'update successfully'
        });
    } catch (error) {
        console.log("Update error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};


const bookAppointment = async (req, res) => {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body

    const docData = await Doctor.findById(docId).select('-password')

    if (!docData) {
      return res.json({ success: false, message: 'Doctor not found' });
    }

    if (!docData.available) {
        return res.json({ success: false, message: 'Doctor not available' })
    }

    let slots_booked = docData.slots_booked

    if (slots_booked[slotDate]) {
        if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({ success: false, message: 'Doctor not available' })
        }
        else {
            slots_booked[slotDate].push(slotTime)
        }
    }
    else {
        slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
    }

    const userData = await User.findById(userId).select('-password')
    delete docData.slots_booked

    const appointmentData = await Appointment.create({
        userId, docId, userData, docData, amount: docData.fees, slotTime, slotDate, date: Date.now(), payment: 'pending'
    })

    await Doctor.findByIdAndUpdate(docId, { slots_booked });
    return res.json({
        success: true,
        message: 'Appointment Booked'
    })
}

const listAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await Appointment.find({ userId }).populate('docData');
        return res.json({
            success: true,
            appointment: appointments 
        })
    }
    catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const cancelAppointment = async (req,res)=>{
    try{
        const userId = req.userId;
        const {appointmentId} = req.body

        const appointmentData = await Appointment.findById(appointmentId);
        if(appointmentData.userId !== userId){
            return res.json({
                success:false,
                message:'Unauthorized action'
            })
        }
        await Appointment.findByIdAndUpdate(appointmentId, {cancelled:true});
        // releasing doctor slot

        const {docId, slotDate, slotTime} = appointmentData;
        const doctorData = await Doctor.findById(docId);
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime);

        await Doctor.findByIdAndUpdate(docId, {slots_booked})
        res.json({
            success:true,
            message:'Appointment cancel'
        })
    }       
    catch(error){
          return res.json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };