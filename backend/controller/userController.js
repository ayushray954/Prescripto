const express = require('express'); 
const webhookRouter = express.Router();
const validator = require('validator')
const bcrypt = require('bcrypt');
const User = require('../model/userModel')
const bodyParser = require('body-parser')
const Doctor = require('../model/doctorModel')
const Appointment = require('../model/appointmentModel')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const Stripe = require('stripe');
// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exitsUser = await User.findOne({email});
        if(exitsUser){
            
            return res.json({
                success:false,
                message:'User already exits'
            })
        }

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
        userId, docId, userData, docData, amount: docData.fees, slotTime, slotDate, date: Date.now(), payment: false
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
        console.log('cancel',appointmentId)

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

const placePayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    console.log('place',appointmentId);
    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.status(400).json({ success: false, message: "Appointment not found or cancelled" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: "Doctor Appointment" },
          unit_amount: appointmentData.amount * 100,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/my-appointment`,
      cancel_url: `${process.env.FRONTEND_URL}/my-appointment`,
      metadata: {
        appointmentId: appointmentData._id.toString(),
        userId: appointmentData.userId.toString(),
      },
    });

    // Optional: store session ID for fallback
    appointmentData.stripeSessionId = session.id;
    await appointmentData.save();

   res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const webhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const appointmentId = session.metadata?.appointmentId;

    console.log("Webhook received for appointment:", appointmentId);

    if (appointmentId) {
      try {
        const appointment = await Appointment.findById(appointmentId);
        if (appointment && !appointment.payment) {
          appointment.payment = true;
          await appointment.save();
          console.log(`✅ Payment marked for appointment ${appointmentId}`);
        } else {
          console.log(`ℹ️ Appointment already marked as paid or not found`);
        }
      } catch (err) {
        console.error("Failed to update appointment payment:", err.message);
      }
    } else {
      console.warn("⚠️ No appointmentId found in metadata");
    }
  }

  res.json({ received: true });
};

module.exports = { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, placePayment, webhookHandler }