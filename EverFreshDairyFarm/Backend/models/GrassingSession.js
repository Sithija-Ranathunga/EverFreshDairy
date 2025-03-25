import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    SessionId:{
        type: String,
        required: true,
    },
    Date:{
        type: Date,
        required: true,
    },
    ShedId:{
        type: String,
        required: true,
    },
    CowGroup:{
        type: String,
        required: true,
    }
});

const Session = mongoose.model('GrassingSession',SessionSchema);
export default Session;