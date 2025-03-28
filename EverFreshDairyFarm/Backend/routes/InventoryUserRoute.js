import express from 'express';
import { getCurrentUser,  getbyIdUser, isAuthenicated, login, logout, register, updateUser } from '../controllers/InventoryUser.js';


import UserAuth from '../middleware/UserAuth.js'

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.get('/getcurrentuser',UserAuth,getCurrentUser);
userRouter.get('/:id',getbyIdUser);
userRouter.put('/:id',updateUser);

userRouter.get('/is-auth',UserAuth,isAuthenicated);






export default userRouter;
