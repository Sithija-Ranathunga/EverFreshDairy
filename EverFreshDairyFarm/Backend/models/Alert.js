import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  cowId: { type: String, required: true },
  message: { type: String, required: true },
  milkAmount: { type: String, required: true },
  temperature: { type: String, required: true },
  isResolved: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const Alert = mongoose.model('Alert', AlertSchema);
export default Alert;