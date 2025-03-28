import mongoose from "mongoose";

const userSChema = new mongoose.SchemaTypeOptions({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    NIC:{
        type: String,
        required: true
    },
    workExperience:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    
})

const userModel = mongoose.model('InventoryDetails', userSChema);

export default userModel;