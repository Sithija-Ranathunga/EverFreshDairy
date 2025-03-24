import mongoose from 'mongoose';
const HealthRecordSchema = new mongoose.Schema({
  cowId: { type: String, required: true },
  temperature: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  milkYield: { type: Number, required: true },
  activityLevel: { type: Number, required: true },
  recordedAt: { type: Date, default: Date.now }
});
export default mongoose.model('HealthRecord', HealthRecordSchema);