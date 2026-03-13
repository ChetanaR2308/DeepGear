import MachineReading from "../models/MachineReading.js";
import { checkAndCreateAlert } from "../services/alertService.js";

export const createReading = async (req, res) => {
  try {

    const reading = await MachineReading.create(req.body);

    // ALERT AUTOMATION
    const alert = await checkAndCreateAlert(reading);

     // 🔹 FIX: update alertFlag if alert created
    if (alert) {
      reading.alertFlag = true;
      await reading.save();
    }
    
    res.status(201).json({
      message: "Reading saved",
      reading,
      alertGenerated: alert ? true : false
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};