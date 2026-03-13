import Alert from "../models/Alert.js";

// Thresholds
const TEMP_THRESHOLD = 80;
const VIBRATION_THRESHOLD = 60;

export const checkAndCreateAlert = async (reading) => {
  try {

    let alertType = null;
    let message = "";
    let severity = "low";

    // Temperature alert
    if (reading.readingValue > TEMP_THRESHOLD) {
      alertType = "High Temperature";
      message = `Temperature too high: ${reading.readingValue}`;
    }

    // Vibration alert
    if (reading.readingValue > VIBRATION_THRESHOLD) {
      alertType = "High Vibration";
      message = `Vibration too high: ${reading.readingValue}`;
    }

    // Severity calculation
    if (reading.readingValue > 90) severity = "critical";
    else if (reading.readingValue > 80) severity = "high";
    else if (reading.readingValue > 70) severity = "medium";

    if (alertType) {

      const alert = await Alert.create({
        machineId: reading.machineId,
        alertType,
        message,
        severity
      });

      return alert;
    }

    return null;

  } catch (error) {
    console.error("Alert Service Error:", error.message);
  }
};