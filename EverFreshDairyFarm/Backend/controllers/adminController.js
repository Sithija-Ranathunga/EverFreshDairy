import MilkingData from '../models/milkingData.js';
import Alert from '../models/Alert.js';
import HealthStats from '../models/healthStats.js';

export async function getMilkingDataById(req, res) {
  try {
    const data = await MilkingData.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching milk production data" });
  }
}

export async function getHealthAlerts(req, res) {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching health alerts" });
  }
}

export async function getHealthStats(req, res) {
  try {
    const stats = await HealthStats.findOne();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching health statistics" });
  }
}
