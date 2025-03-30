import mongoose from "mongoose";

const userSchema = new mongoose.SchemaTypeOptions({
    name:{type: String,required: true},
    email:{type: String,required: true,unique: true },
    NIC:{type: String,required: true},
    workExperience:{type: String,required: true},
    password:{type: String,required: true }
    
})

const userModel = mongoose.model('MilkingUser', userSchema);

export default userModel;