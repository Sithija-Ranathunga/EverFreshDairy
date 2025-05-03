import express from "express";
import { analyzeMilkingTrends, getAlerts, resolveAlert } from "../controllers/alertController.js";

const router = express.Router();

router.get("/analyze", analyzeMilkingTrends);
router.get("/", getAlerts);
router.put("/:id/resolve", resolveAlert);

export default router;
