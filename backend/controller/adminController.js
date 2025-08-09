const Doctor = require('../model/doctorModel');
const validator = require('validator')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const jwt = require('jsonwebtoken')

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({
                success: false,
                message: "please fill the all detail"
            })
        }
            console.log(req.body);
            console.log(req.file);
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "please enter the valid email"
            })
        }
        const existsDoctor = await Doctor.findOne({ email: email });
        if (existsDoctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor already exists"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "password should be min 8 character"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const uploadImage = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
        const imageUrl = uploadImage.secure_url

        const doctor = await Doctor.create({
            name, email, password: hashedPassword, speciality, degree, experience, about, fees, address: JSON.parse(address), image: imageUrl, date: Date.now()
        })

        return res.status(200).json({
            success: true,
            message: "doctor created successfully"
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'doctor not created',
            error : err.message
        })
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn: '1d' })

            return res.status(200).json({
                success: true,
                message: 'Admin logged in successfully',
                token
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'invalid password or email'
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Admin not logged in'
        })
    }
}

const allDoctor = async (req,res)=>{
   try{
     const doctors = await Doctor.find({}).select('-password');
     res.status(200).json({
        success:true,
        doctors
     })
   }
   catch(err){
     console.error("❌ Error in allDoctor:", err); 
      return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    })
   }

}

module.exports = { addDoctor, loginAdmin, allDoctor };