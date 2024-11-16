import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router for navigation
import Auth from "../Utils/Auth";


const Logout = () => {
  const navigate = useNavigate();
    const { handleLogout } = Auth();


    useEffect(() => {
        // Set function to remove the authentication cookie (e.g., 'isLoggedIn')
        const performLogout = async () => {
            await handleLogout();
            navigate("/login");
        };
        // Redirect to login page (or home page)
        performLogout();
    }, [navigate, handleLogout]);

  return (
    <div>
      <h2>Logging out...</h2>
      <p>You are being logged out. Please wait.</p>
    </div>
  );
};

export default Logout;
