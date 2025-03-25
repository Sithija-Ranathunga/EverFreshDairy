import  Express  from "express";
import { AddCowRegisterDetails,GetCowRegisterDetails,deleteCowRegisterDetails,getbyId,updateCowRegisterDetails } from "../controllers/cowregister.js";

const Cowregister = Express.Router();

Cowregister.post('/',AddCowRegisterDetails);
Cowregister.get('/',GetCowRegisterDetails);
Cowregister.get('/:id',getbyId);
Cowregister.put('/:id',updateCowRegisterDetails);
Cowregister.delete('/:id',deleteCowRegisterDetails);

export default Cowregister;