import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

// Get all alerts
router.get("/", async (req, res) => {
  const alerts = await Alert.find({ resolved: false }).sort({ createdAt: -1 });
  res.json(alerts);
});

// Mark an alert as resolved
router.put("/:id", async (req, res) => {
  await Alert.findByIdAndUpdate(req.params.id, { resolved: true });
  res.json({ message: "Alert resolved!" });
});

export default router;
