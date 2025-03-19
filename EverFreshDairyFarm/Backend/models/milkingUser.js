import mongoose from "mongoose";

const userSChema = new mongoose.SchemaTypeOptions({
    name:{type: String,required: true},
    email:{type: String,required: true,unique: true },
    password:{type: String,required: true }
})

const userModel = mongoose.model('milkingDetails', userSChema);

export default userModel;