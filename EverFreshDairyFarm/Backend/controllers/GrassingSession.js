import GrassingModel from '../models/GrassingSession.js';

//Add the Session details
export const AddSession = async (req,res)=>{
    const {SessionId, Date, ShedId, CowGroup} = req.body;

    if(!SessionId || !Date || !ShedId || !CowGroup){
        return res.status(400).json({})
    }

    try{
        const Session = new GrassingModel({SessionId,Date,ShedId,CowGroup});
        await Session.save();

        return res.status(201).json({success:true, message:"GrassingSession Details are added."});

    }catch(error){
        res.status(500).json({success:false, message: error.message});
    }
}

//Get Session Deatils
export const GetSession = async (req,res)=>{
    try{

        const Session = await GrassingModel.find();

        if(!Session){
            return res.status(404).json({success:false,message:"Session Details not found"});
        }

        return res.status(200).json({success:true, Session})

    }catch(error){
        res.status(500).json({success:false, message: error.message})
    }
}

//Get By Id
export const GetById = async (req, res) =>{
    try{

        const {id} = req.params;
        const session = await GrassingModel.findById(id);

        if(!session){
            return res.status(404).json({success:false, message: "Session is not found"})
        }
        return res.status(200).json({success:true,session})

    }catch(error){
        res.status(500).json({success:false, message: error.message})
    }
}

//update Session details
export const updateSession = async (req,res) =>{
    try{

        const {id} = req.params;
        const session = await GrassingModel.findByIdAndUpdate(id,req.body);

        if(!session){
            res.status(404).json({success:false,message:"Session details not found"})

        }

        const updateSession = await GrassingModel.findById(id);
        res.status(200).json({success:true, updateSession});

    }catch(error){
        res.status(500).json({success:false,message: error.message});
    }
}

//delete the Session
export const deleteSession = async (req, res) =>{
    try{
          const {id} = req.params;
          const session = await GrassingModel.findByIdAndDelete(id);
          res.status(200).json({message:"Session delete succefull"});
          
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}