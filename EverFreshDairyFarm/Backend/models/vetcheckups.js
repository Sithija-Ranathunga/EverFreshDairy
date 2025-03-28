import mongoose from "mongoose";

const CheckupsSchema = new mongoose.SchemaTypeOptions({
    cowID:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true,
    },
    CheckupReason:{
        type: String,
        required: true
    },
    Diagnosis:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        required: true,
        default: Date.now,
    },
    SpecialNote:{
        type: String,
        required: true,   
    }
})

const Checkups = mongoose.model('Chekcups',CheckupsSchema  );

export default Checkups;
