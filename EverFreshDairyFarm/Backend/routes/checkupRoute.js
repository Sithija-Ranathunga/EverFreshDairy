import  Express  from "express";
import { AddCheckupsDetails, GetCheckups, deleteCheckupDetails, getbyId, updateCheckupDetails } from "../controllers/checkups.js ";

const CheckupRouter = Express.Router();

CheckupRouter.post('/',AddCheckupsDetails);
CheckupRouter.get('/',GetCheckups);
CheckupRouter.get('/:id',getbyId);
CheckupRouter.put('/:id',updateCheckupDetails);
CheckupRouter.delete('/:id',deleteCheckupDetails);

export default CheckupRouter ;