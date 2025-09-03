const jwt  = require('jsonwebtoken');
require('dotenv').config();


const authUser = async(req,res,next)=>{
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Not Authorized login Again!'
            })
        }
        const decode_token = jwt.verify(token,process.env.SECRET_KEY);

        req.userId = decode_token.userId;
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports = authUser