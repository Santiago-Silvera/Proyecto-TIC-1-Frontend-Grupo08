import React, { useState } from "react";
import axiosInstance from "../Utils/AxiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/LogIn.css";
import useAuth from "../Utils/Auth";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axiosInstance.post("/api/v1/users/login", {
        username,
        password,
      });
      const jwtToken = response.data["jwt"];
      handleLogin(jwtToken);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password");
      console.error("Error during username login:", error);
    }
  };

  return (
      <div className="LogIn-container">
        <form onSubmit={handleSubmit} className="username-login-form">
          <h2>Log In</h2>
          {error && <p className="error-message">{error}</p>}
          <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button type="submit" className="LogIn-buttons">
            Login
          </button>
        </form>
      </div>
  );
};

export default LogIn;