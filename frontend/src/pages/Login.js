import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);

      alert("Login successful");

      navigate("/dashboard");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("BACKEND ERROR:", error.response?.data);

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="logo">
        <span className="gear">⚙</span> DeepGear
        </h2>
        <p className="login-subtitle">
          Predictive Maintenance System
        </p>

        <form onSubmit={handleLogin}>

          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            Login
          </button>

        </form>

        <p className="register-link">
          No account? <a href="/register">Register</a>
        </p>

      </div>

    </div>
  );
}

export default Login;