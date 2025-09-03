const jwt  = require('jsonwebtoken');
require('dotenv').config();


const authDoctor = async(req,res,next)=>{
    try{
        const token = req.headers['dtoken'];
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Not Authorized login Again!'
            })
        }
        const decode_token = jwt.verify(token,process.env.SECRET_KEY);

        req.docId = decode_token.id;
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports = authDoctor