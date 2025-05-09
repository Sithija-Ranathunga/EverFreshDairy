import Alert from "../models/Alert.js";

export const createAlert = async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ isResolved: false }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { isResolved: true },
      { new: true }
    );
    res.json(alert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};