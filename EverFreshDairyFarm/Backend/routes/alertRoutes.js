import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

// Get all alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find({ resolved: false });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching alerts." });
  }
});

// Mark an alert as resolved
router.put('/alerts/:id', async (req, res) => {
  try {
    await Alert.findByIdAndUpdate(req.params.id, { resolved: true });
    res.json({ message: 'Alert resolved' });
  } catch (error) {
    res.status(500).json({ error: "Error updating alert status." });
  }
});

export default router;
