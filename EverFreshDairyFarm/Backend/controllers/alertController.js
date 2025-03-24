import HealthRecord from '../models/HealthRecord.js';
import Alert from '../models/Alert.js';

export async function checkHealthAlerts() {
  const records = await HealthRecord.find();
  records.forEach(async (record) => {
    if (record.temperature > 40) {
      await Alert.create({
        cowId: record.cowId,
        alertType: 'temperature',
        message: `High temperature detected for cow ${record.cowId}`
      });
    }
    if (record.milkYield < 10) {
      await Alert.create({
        cowId: record.cowId,
        alertType: 'milk_yield',
        message: `Low milk yield detected for cow ${record.cowId}`
      });
    }
  });
}