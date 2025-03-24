import mongoose from 'mongoose';
const AlertSchema = new mongoose.Schema({
  cowId: { type: String, required: true },
  alertType: { type: String, enum: ['temperature', 'milk_yield', 'activity'], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});
export default mongoose.model('Alert', AlertSchema);