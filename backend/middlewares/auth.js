import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const protect = async (req,res,next)=>{
    const authHeader = req.headers.Authorization || req.headers.authorization;
    let token;
    try {
        if(authHeader && authHeader.startsWith('Bearer ')){
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWt_SECRET_KEY);
            const userid=decoded.id;
            const user = await User.findById(userid);
            if(!user){
                 return res.status(403).json({ sucess:false,message:"Not authorized, user not found"});
            }
            req.user=user;
            next();
                }
    } catch (error) {
         return res.status(403).json({ sucess:false,message:"Not authorized, user not found"});
    }
}