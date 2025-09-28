import express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import { connectDb } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import messageRouter from "./routes/messageRoute.js";

dotenv.config();

const app = express();

const port = process.env.port || 3000;
//middleare
connectDb();

app.use(cors());

app.use(express.json());


app.use('/api/user',userRoute);

app.use('/api/chat',chatRouter);

app.use('/api/message',messageRouter);

app.get('/',(req,res)=>{
    res.send("server is live!")
})

app.listen(port,(e)=>{
    console.log("server listening on",port);
})