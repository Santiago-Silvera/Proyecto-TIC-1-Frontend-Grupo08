import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router for navigation
import Auth from "../Utils/Auth";


const Logout = () => {
  const navigate = useNavigate();
    const { handleLogout } = Auth();

  useEffect(() => {
    // Remove the authentication cookie (e.g., 'isLoggedIn')
   handleLogout();
    // Redirect to login page (or home page)
    navigate("/login");
  }, [navigate, handleLogout]);

  return (
    <div>
      <h2>Logging out...</h2>
      <p>You are being logged out. Please wait.</p>
    </div>
  );
};

export default Logout;
