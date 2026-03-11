import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const navigate = useNavigate();

  const [machines, setMachines] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {

    fetchMachines();

    const storedUser = localStorage.getItem("username");

    if (storedUser) {
      setUsername(storedUser);
    }

  }, []);

  const fetchMachines = async () => {
    try {
      const res = await API.get("/machines");
      setMachines(res.data);
    } catch (error) {
      console.log("Error fetching machines:", error);
    }
  };

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  /* Status calculations */

  const totalMachines = machines.length;

  const healthyMachines = machines.filter(
    (m) => m.status === "active"
  ).length;

  const warningMachines = machines.filter(
    (m) => m.status === "warning"
  ).length;

  const criticalMachines = machines.filter(
    (m) => m.status === "maintenance"
  ).length;

  /* Chart Data */

  const temperatureData = {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [60,65,63,70,68,75],
        borderColor: "#2c5364",
        backgroundColor: "#2c5364",
        tension: 0.4
      }
    ]
  };

  const healthData = {
    labels: ["Healthy","Warning","Critical"],
    datasets: [
      {
        data: [healthyMachines, warningMachines, criticalMachines],
        backgroundColor: [
          "#27ae60",
          "#f39c12",
          "#e74c3c"
        ]
      }
    ]
  };

  const efficiencyData = {
    labels: ["Machine A","Machine B","Machine C","Machine D"],
    datasets: [
      {
        label: "Efficiency %",
        data: [85,78,92,88],
        backgroundColor: "#3498db"
      }
    ]
  };

  return(

    <div className="dashboard-layout">

      {/* Sidebar */}

      <div className="sidebar">

        <h2 className="logo">
          <span className="gear">⚙</span> DeepGear
        </h2>

        <ul>
          <li>Dashboard</li>
          <li>Machines</li>
          <li>Alerts</li>
          <li>Maintenance Logs</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>

      </div>

      {/* Main Section */}

      <div className="main">

        {/* Navbar */}

        <div className="navbar">

          <h3>Predictive Maintenance Dashboard</h3>

          {/* Profile */}

          <div className="profile-container">

            <span className="profile-name">{username}</span>

            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="profile"
              className="profile-avatar"
            />

          </div>

        </div>

        {/* Content */}

        <div className="content">

          {/* Status Cards */}

          <div className="status-cards">

            <div className="card total">
              <h3>{totalMachines}</h3>
              <p>Total Machines</p>
            </div>

            <div className="card healthy">
              <h3>{healthyMachines}</h3>
              <p>Healthy</p>
            </div>

            <div className="card warning">
              <h3>{warningMachines}</h3>
              <p>Warning</p>
            </div>

            <div className="card critical">
              <h3>{criticalMachines}</h3>
              <p>Critical</p>
            </div>

          </div>

          {/* Machine Table */}

          <h3>Machines</h3>

          <table className="machine-table">

            <thead>
              <tr>
                <th>Machine ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {machines.length === 0 ? (
                <tr>
                  <td colSpan="4">No machines found</td>
                </tr>
              ) : (
                machines.map((m)=>(
                  <tr key={m._id}>
                    <td>{m.machineId}</td>
                    <td>{m.type}</td>
                    <td>{m.location}</td>
                    <td>{m.status}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

          {/* Charts */}

          <div className="charts">

            <div className="chart-card chart-large">
              <h3>Machine Temperature Trend</h3>
              <Line data={temperatureData}/>
            </div>

            <div className="chart-card">
              <h3>Machine Health Status</h3>
              <Pie data={healthData}/>
            </div>

            <div className="chart-card">
              <h3>Machine Efficiency</h3>
              <Bar data={efficiencyData}/>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;