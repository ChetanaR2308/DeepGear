import MachineReading from "../models/MachineReading.js";
import { checkAndCreateAlert } from "../services/alertService.js";

export const createReading = async (req, res) => {
  try {

    const reading = await MachineReading.create(req.body);

    // ALERT AUTOMATION
    const alerts = await checkAndCreateAlert(reading);

    // ✅ FIX: handle multiple alerts
    if (alerts && alerts.length > 0) {
      reading.alertFlag = true;
      await reading.save();
    }
    
    res.status(201).json({
      message: "Reading saved",
      reading,
      alertGenerated: alerts && alerts.length > 0
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};