import Alert from "../models/Alert.js";

// Thresholds
const TEMP_THRESHOLD = 80;
const VIBRATION_THRESHOLD = 5;
const levels = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
};

export const checkAndCreateAlert = async (reading) => {
  try {

    let alertsToProcess = [];

    // 🔴 Temperature
    if (reading.temperature > TEMP_THRESHOLD) {
      let severity = "medium";
      if (reading.temperature > 100) severity = "critical";
      else if (reading.temperature > 90) severity = "high";

      alertsToProcess.push({
        alertType: "High Temperature",
        message: `Temperature too high: ${reading.temperature}`,
        severity
      });
    }

    // 🔴 Vibration
    if (reading.vibration > VIBRATION_THRESHOLD) {
      let severity = "medium";
      if (reading.vibration > 8) severity = "critical";
      else if (reading.vibration > 6) severity = "high";

      alertsToProcess.push({
        alertType: "High Vibration",
        message: `Vibration too high: ${reading.vibration}`,
        severity
      });
    }

    let finalAlerts = [];

    // 🔥 MAIN LOGIC
    for (let a of alertsToProcess) {

      const existingAlert = await Alert.findOne({
        machineId: reading.machineId,
        alertType: a.alertType,
        resolved: false
      });

      if (!existingAlert) {
        // ✅ CREATE NEW ALERT
        const newAlert = await Alert.create({
          machineId: reading.machineId,
          alertType: a.alertType,
          message: a.message,
          severity: a.severity
        });

        console.log("🚨 New Alert Sent:", a.alertType);
        finalAlerts.push(newAlert);

      } else {
        // 🔥 ESCALATION CHECK
        if (levels[a.severity] > levels[existingAlert.severity]) {

          existingAlert.severity = a.severity;
          existingAlert.message = a.message;
          await existingAlert.save();

          console.log("🚨 Escalation Alert Sent:", a.alertType);
          finalAlerts.push(existingAlert);
        }
      }
    }

    return finalAlerts.length > 0 ? finalAlerts : null;

  } catch (error) {
    console.error("Alert Service Error:", error.message);
  }
};