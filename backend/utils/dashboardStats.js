import Machine from "../models/Machine.js";
import Alert from "../models/Alert.js";

export const getDashboardStats = async () => {

  const totalMachines = await Machine.countDocuments();

  const activeMachines = await Machine.countDocuments({
    status: "active"
  });

  const maintenanceMachines = await Machine.countDocuments({
    status: "maintenance"
  });

  const totalAlerts = await Alert.countDocuments();

  return {
    totalMachines,
    activeMachines,
    maintenanceMachines,
    totalAlerts
  };

};