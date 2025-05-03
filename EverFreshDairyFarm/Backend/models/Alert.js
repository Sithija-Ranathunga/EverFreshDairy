import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    cowId: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false }
});

const Alert = mongoose.model("Alert", alertSchema);
export default Alert;
