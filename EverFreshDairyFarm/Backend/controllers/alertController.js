import Alert from "../models/Alert.js";
import MilkingData from "../models/MilkingData.js";

export const analyzeMilkingTrends = async (req, res) => {
    try {
        const records = await MilkingData.find();
        const trends = {};

        records.forEach(record => {
            const date = new Date(record.createdAt).toISOString().split('T')[0];
            if (!trends[record.cowId]) trends[record.cowId] = {};
            if (!trends[record.cowId][date]) trends[record.cowId][date] = 0;
            trends[record.cowId][date] += parseFloat(record.amountofMilk);
        });

        for (const cowId in trends) {
            const dailyYields = Object.values(trends[cowId]);
            const avg = dailyYields.reduce((a, b) => a + b, 0) / dailyYields.length;
            const latest = dailyYields[dailyYields.length - 1];

            if (latest < avg * 0.7) { // 30% drop triggers alert
                const existing = await Alert.findOne({ cowId, resolved: false });
                if (!existing) {
                    const alert = new Alert({
                        cowId,
                        message: `Alert: Cow ${cowId} has a sudden drop in milk yield! Possible illness.`
                    });
                    await alert.save();
                }
            }
        }

        res.json({ message: "Trends analyzed and alerts checked." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAlerts = async (req, res) => {
  try {
      const alerts = await Alert.find({ resolved: false });
      res.json({ alerts });  // <–– wrap it in { alerts: [...] }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const resolveAlert = async (req, res) => {
    await Alert.findByIdAndUpdate(req.params.id, { resolved: true });
    res.json({ message: "Alert resolved." });
};
