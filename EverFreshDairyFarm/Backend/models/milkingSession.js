import mongoose from "mongoose";

const milkingSessionSchema = new mongeese.Schema({
    
    sessionId: {type: Number, unique: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    cowGroup: {type: String, required: true},
    status: {type:String, enum:['Completed', 'Incomplete','Cancelled'], required: true},
    specialNotes: {type: String},

}
);

const milkingSession = mongoose.model('milking',milkingSessionSchema);

export default milkingSession;
