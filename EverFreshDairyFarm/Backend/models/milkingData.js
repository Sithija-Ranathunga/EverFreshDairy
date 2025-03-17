import mongoose from "mongoose";

const milkingDataSchema = new mongoose.Schema({

    milkBatchId: {type: Number, required: true, unique: true},
    amountofMilk: {type: Number, required: true },
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
    milkYield: {type: Number, required: true},
    qualityCheckResult: { type: String, enum: ['pass', 'Fail'], required: true },   
    notes: {type: String , required: true},

}
);

const milkingData = mongoose.model('milking', milkingDataSchema);
module.exports = milkingData;