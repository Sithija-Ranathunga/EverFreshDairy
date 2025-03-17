import Milking from "../models/Milking.js";
import Alert from "../models/Alert.js";

export const checkMilkYield = async () => {
  const cows = await Milking.distinct("cowId");
  
  for (const cowId of cows) {
    const records = await Milking.find({ cowId }).sort({ date: -1 }).limit(7);

    if (records.length < 7) continue; // Not enough data

    const avgYield = records.reduce((sum, r) => sum + r.milkYield, 0) / records.length;
    const latestYield = records[0].milkYield;

    if (latestYield < avgYield * 0.8) { // If milk yield drops more than 20%
      await Alert.create({
        cowId,
        type: "low_milk",
        message: `Cow ${cowId} has a sudden drop in milk yield.`,
      });
    }
  }
};
