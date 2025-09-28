import express from 'express';
import { createChat, deleteChat, getChats } from '../controllers/chatController.js';
import { protect } from '../middlewares/auth.js';
const chatRouter = express.Router();

chatRouter.use(protect);

chatRouter.post('/',createChat);

chatRouter.get('/',getChats);

chatRouter.delete('/',deleteChat)

export default chatRouter;