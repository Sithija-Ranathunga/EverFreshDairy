import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  cowId: { type: String, required: true },
  type: { type: String, enum: ["low_milk", "missed_checkup", "frequent_treatment"], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

export default mongoose.model("Alert", AlertSchema);
