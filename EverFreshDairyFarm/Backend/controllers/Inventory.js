import Inventorymodel from '../models/Inventory.js';

//Add the inventory details
export const AddInventoryDetails = async (req,res) => {
    const {location, quantity, lastUpdate, supplier} = req.body;

    if(!location || !quantity || !lastUpdate || !supplier){
        return res.status(400).json({})
    }

    try{
       const inventory = new Inventorymodel({location,quantity,lastUpdate,supplier});
       await inventory.save();

       return res.status(201).json({success:true, message:"Inventory Details are added."})

    }catch(error){
        res.status(500).json({success:false, message:error.message});
    }
}

//Get Inventory details
export const GetInventories = async (req,res) =>{
    try{

        const inventory = await Inventorymodel.find();

        if(!inventory){
            return res.status(404).json({success:false, message:"Inventory details are not found"});
        }

        return res.status(200).json({success:true,inventory});

    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//Get by id 
export const getbyId = async (req,res) =>{
    try{
         const {id} = req.params;
         const inventory = await Inventorymodel.findById(id);

         if(!inventory){
            return res.status(404).json({success:false,message:"Inventory is not found"})
         }

         return res.status(200).json({success:true,inventory});
    }catch(error){
        return res.status(500).json({success:false,message:error.message});
    }
}

//update inventory details
export const updateInventory = async (req, res)=>{
    try{
        const {id} = req.params;
        const inventory = await Inventorymodel.findByIdAndUpdate(id,req.body);

        if(!inventory){
            res.status(404).json({success:false,message:"Inventory Details are not found"})
        }

        const updateinventory = await Inventorymodel.findById(id);
        res.status(200).json({success:true,updateinventory});

    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//delete the inventory details
export const deleteInventory = async (req, res) => {
    try {
      const { id } = req.params;
      const inventory = await Inventorymodel.findByIdAndDelete(id);
      res.status(200).json({ message: "Inventory delete successfull" });
    } catch {
      res.status(500).json({ message: error.message });
    }
}
  
  