import Chat from "../models/chat.js";
import openai from "../config/openai.js";

export const messageController = async(req,res)=>{
    try {
        const userId=req.user._id;
        const {chatId , prompt}=req.body;
        const chat = await Chat.findOne({userId , _id:chatId});
        chat.messages.push({role:"user" , content:prompt,timestamp:Date.now()});

        const {choices} = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content:prompt,
        },
    ],
});
const reply = {...choices[0].message ,timestamp:Date.now() }
res.json({success:true,reply}); 
chat.messages.push(reply);
await chat.save();
  
 } catch (error) {
          return res.json({success:false,message:error.message});
    }
}