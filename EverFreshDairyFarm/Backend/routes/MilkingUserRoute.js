import express from 'express';
import { getUserData, getbyIdUser, login, logout, register, updateUser } from '../controllers/MilkingUser.js';


const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.get('/',getUserData);
userRouter.get('/:id',getbyIdUser);
userRouter.put('/:id',updateUser);

export default userRouter;