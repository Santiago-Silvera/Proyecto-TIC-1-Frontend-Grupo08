import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router for navigation
import Cookies from "js-cookie";

const Logout = () => {
    const navigate = useNavigate();

    // Resets cookies and moves you to log in page
    useEffect(() => {
        // Remove the authentication cookie (e.g., 'isLoggedIn')
        Cookies.remove("isLoggedIn");
        Cookies.remove("jwtToken");

        // Redirect to login page (or home page)
        navigate("/login");
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
            <p>You are being logged out. Please wait.</p>
        </div>
    );
};

export default Logout;