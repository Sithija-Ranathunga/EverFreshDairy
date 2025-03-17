import Veterinary from "../models/Veterinary.js";
import Alert from "../models/Alert.js";

export const checkMissedVetVisits = async () => {
  const today = new Date();
  const overdueCows = await Veterinary.find({ visitDate: { $lt: today.setDate(today.getDate() - 30) } });

  for (const cow of overdueCows) {
    await Alert.create({
      cowId: cow.cowId,
      type: "missed_checkup",
      message: `Cow ${cow.cowId} missed a scheduled vet check-up.`,
    });
  }
};
