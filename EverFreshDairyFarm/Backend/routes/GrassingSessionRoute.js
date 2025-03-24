import  Express  from "express";
import { AddSession, GetById, GetSession, deleteSession, updateSession } from "../controllers/GrassingSession.js";


const GrassingSessionRouter = Express.Router();

GrassingSessionRouter.post('/',AddSession);
GrassingSessionRouter.get('/',GetSession);
GrassingSessionRouter.get('/:id',GetById);
GrassingSessionRouter.put('/:id',updateSession);
GrassingSessionRouter.delete('/:id',deleteSession);

export default GrassingSessionRouter;