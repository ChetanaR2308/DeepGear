import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse same styling

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful");
      navigate("/");

    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("BACKEND ERROR:", error.response?.data);

      alert("Registration failed");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="logo">
          <span className="gear">⚙</span> DeepGear
        </h2>

        <p className="login-subtitle">
          Create your account
        </p>

        <form onSubmit={handleRegister}>

          <input
            className="login-input"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            Register
          </button>

        </form>

        <p className="register-link">
          Already have an account? <a href="/">Login</a>
        </p>

      </div>

    </div>
  );
}

export default Register;