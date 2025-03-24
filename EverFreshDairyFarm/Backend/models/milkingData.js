import mongoose from "mongoose";

const MilkingDataSchema = new mongoose.Schema({

    cowId: {type: Number, required: true },
    amountofMilk: {type: Number, required: true },
    duration: {type: Number, required: true},
    qualityCheckResult: { type: String, enum: ['pass', 'Fail'], required: true },  
    

}
);

const MilkingData = mongoose.model('MilkingData', MilkingDataSchema);
export default MilkingData;