import React, { useState } from "react";
import axiosInstance from "../Utils/AxiosConfig";
import { useNavigate } from "react-router-dom"; // Allows to redirect
import "../styles/LogIn.css";
import Auth from "../Utils/Auth";

const LogIn = () => {
  // States for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = Auth();
  const navigate = useNavigate(); // Initializing navigate

  // Manages logging in
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/users/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      const jwtToken = response.data["jwt"];
      console.log("Retrieved token: ", jwtToken);
      handleLogin(jwtToken);
      navigate("/");
    } catch (error) {
      console.error("Error during username login:", error);
    }
  };

  return (
      <div className="LogIn-container">
        <div className="username-login-form">
          <h2>Log In</h2>
          <input
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="LogIn-buttons">
            Login
          </button>
        </div>
      </div>
  );
};

export default LogIn;