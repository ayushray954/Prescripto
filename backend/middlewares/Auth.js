const jwt  = require('jsonwebtoken');
require('dotenv').config();


const authAdmin = async(req,res,next)=>{
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Not Authorized login Again!'
            })
        }
        const decode_token = jwt.verify(token,process.env.SECRET_KEY);
        if(decode_token.email!==process.env.ADMIN_EMAIL){
            return res.status(400).json({
                success:false,
                message:'Not Authorized admin'
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports = authAdmin