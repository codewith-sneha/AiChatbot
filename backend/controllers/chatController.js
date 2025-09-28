import Chat from "../models/chat.js";

export const createChat =async(req,res)=>{
  try{
     const userId = req.user._id;
   const chatData = {
    userId,
    userName:req.user.name,
    messages:[],
    name:"new chat"
   } 
   await Chat.create(chatData);
   return res.json({success:true,message:"chat created"});
  }catch(e){
     return res.json({success:false,message:e.message});
  }
}

export const getChats =async(req,res)=>{
  try{
     const userId = req.user._id;
    const chats = await Chat.find({userId}).sort({updatedAt:-1});
   return res.json({success:true,chats});
  }catch(e){
     return res.json({success:false,message:e.message});
  }
}

export const deleteChat =async(req,res)=>{
  try{
     const {chatId }= req.body;
      const userId = req.user._id;
    await Chat.deleteOne({_id:chatId,userId});
   return res.json({success:true,message:"chat deleted"});
  }catch(e){
     return res.json({success:false,message:e.message});
  }
}