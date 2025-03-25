import mongoose from 'mongoose';

const AnimalregisterSchema  = new mongoose.Schema({
    CowID:{
        type: String,
        required: true,
    },
    BirthDate:{
        type: Date,
        required: true,
        default: Date.now,
    },
    Gender:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
        
    },
    Status:{
        type: String,
        required: true,   
    }
});

const  VetAnimalRegistery= mongoose.model('Vetanimalregistery',AnimalregisterSchema);
export default VetAnimalRegistery;
