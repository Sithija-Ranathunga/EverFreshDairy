import Checkupsmodel from '../models/vetcheckups.js';

//Add the checkups details
export const AddCheckupsDetails = async (req,res) => {
    const {cowID,location,CheckupReason,Diagnosis,Date,SpecialNote} = req.body;

    if(!cowID || !location || !CheckupReason || !Diagnosis ||!Date ||!SpecialNote){
        return res.status(400).json({})
    }

    try{
       const checkups = new Checkupsmodel({cowID,location,CheckupReason,Diagnosis,Date,SpecialNote});
       await checkups.save();

       return res.status(201).json({success:true, message:"Checkup records are added."})

    }catch(error){
        res.status(500).json({success:false, message:error.message});
    }
}

//Get checkups details
export const GetCheckups = async (req,res) =>{
    try{

        const checkups = await Checkupsmodel.find();

        if(!checkups){
            return res.status(404).json({success:false, message:"Checkup records are not found."});
        }

        return res.status(200).json({success:true,checkups});

    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//Get by id 
export const getbyId = async (req,res) =>{
    try{
         const {id} = req.params;
         const checkups = await Checkupsmodel.findById(id);

         if(!checkups){
            return res.status(404).json({success:false,message:"Checkup record is not found."})
         }

         return res.status(200).json({success:true,checkups});
    }catch(error){
        return res.status(500).json({success:false,message:error.message});
    }
}

//update checkups details
export const updateCheckupDetails = async (req, res)=>{
    try{
        const {id} = req.params;
        const checkups = await Checkupsmodel.findByIdAndUpdate(id,req.body);

        if(!checkups){
            res.status(404).json({success:false,message:"Checkup records are not found."})
        }

        const updatecheckups = await Checkupsmodel.findById(id);
        res.status(200).json({success:true,updatecheckups});

    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//delete the checkups details
export const deleteCheckupDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const checkups = await Checkupsmodel.findByIdAndDelete(id);
      res.status(200).json({ message: "Checkup record deleted successfully" });
    } catch {
      res.status(500).json({ message: error.message });
    }
}
  
  