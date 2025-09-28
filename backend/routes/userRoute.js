import express, { Router } from 'express';
import { getUser, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const userRoute = express.Router() ;

userRoute.post('/register',registerUser);
userRoute.post('/login',loginUser);
userRoute.get('/getuser', protect,getUser);

export default userRoute;
