import mongoose from "mongoose";
import User from "./user.js";

const chatSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        ref:'User'
    },
    userName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    messages:[
        {
            role:{
                type:String,
                required:true
            },
            content:{
                type:String,
                required:true
            },
            timestamp:{
                type:Number,
                required:true
            }
        }
    ],

},{timestamps:true});

const Chat = mongoose.model("chat",chatSchema);

export default Chat;