import React, { useState } from "react";
import axiosInstance from "../Utils/AxiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";
import Auth from "../Utils/Auth";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleLogin } = Auth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Checks password is right
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    // Funtion that reaches the backend
    try {
      const response = await axiosInstance.post("/api/v1/users/register", {
        username,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      const jwtToken = response.data["jwt"];
      console.log("Retrieved token: ", jwtToken);
      handleLogin(jwtToken);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
      <div className="RegisterPage-container">
        {/* Containers to show and input data*/}
        <div className="register-form">
          <h2>Sign Up</h2>
          <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="RegisterPage-buttons">
            Sign Up
          </button>
        </div>
      </div>
  );
};

export default RegisterPage;