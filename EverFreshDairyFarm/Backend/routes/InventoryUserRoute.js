import express from 'express';
<<<<<<< Updated upstream
import { getCurrentUser,  getbyIdUser, isAuthenicated, login, logout, register, updateUser } from '../controllers/InventoryUser.js';
=======
import { getUserData, getbyIdUser, isAuthenticated, login, logout, register, updateUser } from '../controllers/InventoryUser.js';
>>>>>>> Stashed changes
import UserAuth from '../middleware/UserAuth.js'

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.get('/getcurrentuser',UserAuth,getCurrentUser);
userRouter.get('/:id',getbyIdUser);
userRouter.put('/:id',updateUser);
<<<<<<< Updated upstream
userRouter.get('/is-auth',UserAuth,isAuthenicated);

=======
userRouter.get('/is-auth',UserAuth,isAuthenticated);
>>>>>>> Stashed changes

export default userRouter;
