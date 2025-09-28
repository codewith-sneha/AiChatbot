import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import User from "../models/user.js";


const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWt_SECRET_KEY,{
        expiresIn:'3d'
    })
}

export const registerUser=async(req,res)=>{
    const{name,email,password}=req.body;
    try {
        const isUserExists = await User.findOne({email});
        if(isUserExists){
            return res.status(400).json({ success:false,message:"user already exists"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashPassword});
        const token=generateToken(user._id);
            if(user){
               return res.status(201).json({
                    success:true,
                    token
                })
            }

    } catch (error) {
       return  res.status(400).json({ success:false,message:error.message});
    }
}

export const loginUser = async(req,res)=>{
    const{name,email,password}=req.body
    try {
        const user = await User.findOne({email});
        if(user){
            const isMatch = await bcrypt.compare(password,user.password);
            
            if(isMatch){
                const token=generateToken(user._id);
                return res.status(201).json({
                    success:true,
                    token
                })
            }
        }
         return res.status(400).json({ success:false,message:"Invalid email or password"});
    } catch (error) {
         return  res.status(400).json({ success:false,message:error.message});
    }
}

export const getUser = async(req,res)=>{
    try {
        const user = req.user;
        return res.json({success:true , user});
    } catch (error) {
        return res.json({success:false , message:error.message});
    }
}