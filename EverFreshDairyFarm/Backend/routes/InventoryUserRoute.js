import express from 'express';
import { getUserData, getUserProfile, getbyIdUser, isAuthenicated, login, logout, register, updateUser } from '../controllers/InventoryUser.js';
import UserAuth from '../middleware/UserAuth.js'

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.get('/',UserAuth,getUserData);
userRouter.get('/:id',getbyIdUser);
userRouter.put('/:id',updateUser);
userRouter.post('/is-auth',UserAuth,isAuthenicated);


export default userRouter;
