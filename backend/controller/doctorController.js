const Doctor = require("../model/doctorModel");



const changeAvailability = async (req,res)=>{
    try{
        const {docId} = req.body
        const docData = await Doctor.findById(docId);
        await Doctor.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({
            success:true,
            message:'Availablity changed'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const doctorsList = async (req,res)=>{
    try{
        const doctors = await Doctor.find({}).select(['-password','-email'])
        console.log("Doctors from DB:", doctors);
        res.status(200).json({
            success:true,
            doctors
        })
    }
   catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {changeAvailability,doctorsList}