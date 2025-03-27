import mongoose from "mongoose";

const milkingSessionSchema = new mongoose.Schema({

    SessionId: {type: String, required: true },
    shedId : {type: String, required: true },
    date: {type: Date, required: true},
    cow_group: {type: String, required: true},  
    specialNotes: {type: String}, 


}
);

const milkingSession = mongoose.model('milkingSession', milkingSessionSchema);
export default milkingSession;