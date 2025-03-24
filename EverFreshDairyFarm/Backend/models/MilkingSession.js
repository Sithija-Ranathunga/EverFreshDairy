import mongoose from "mongoose";

const MilkingSessionSchema = new mongoose.Schema({

    SessionId: {type: Number, required: true },
    time : {type: Number, required: true },
    date: {type: Date, required: true},
    cow_group: {type: Number, required: true},  
    specialNotes: {type: String}, 


}
);

const MilkingSession = mongoose.model('MilkingSession', MilkingSessionSchema);
export default MilkingSession;