import cowregister from '../models/cowregister.js';

//Add the Cowregister details
export const AddCowRegisterDetails = async (req,res) => {
    const {CowID, BirthDate, Gender, location, age, Status} = req.body;

    if(!CowID || !BirthDate || !Gender || !location || !age || !Status){
        return res.status(400).json({})
    }

    try{
       const Cowregister = new cowregister({CowID, BirthDate, Gender, location, age, Status});
       await Cowregister.save();

       return res.status(201).json({success:true, message:"Cow registration details are added."})

    }catch(error){
        res.status(500).json({success:false, message:error.message});
    }
}

//Get Cowregister details
export const GetCowRegisterDetails = async (req,res) =>{
    try{

        const Cowregistry = await cowregister.find();

        if(!Cowregistry){
            return res.status(404).json({success:false, message:"Cow registration details are not found."});
        }

        return res.status(200).json({success:true,Cowregistry});

    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//Get by id 
export const getbyId = async (req,res) =>{
    try{
         const {id} = req.params;
         const Cowregister = await cowregister.findById(id);

         if(!cowregister){
            return res.status(404).json({success:false,message:"Cow registration is not found."})
         }

         return res.status(200).json({success:true,});
    }catch(error){
        return res.status(500).json({success:false,message:error.message});
    }
}

//update inventory details
export const updateCowRegisterDetails= async (req, res)=>{
    try{
        const {id} = req.params;
        const  Cowregister= await cowregister.findByIdAndUpdate(id,req.body);

        if(!cowregister){
            res.status(404).json({success:false,message:"Cow registration details are not found."})
        }

        const updateCowregister = await cowregister.findById(id);
        res.status(200).json({success:true,updateCowregister});

    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//delete the inventory details
export const deleteCowRegisterDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const Cowregister = await cowregister.findByIdAndDelete(id);
      res.status(200).json({ message: "Cow registration deleted successfully." });
    } catch {
      res.status(500).json({ message: error.message });
    }
}
  
  