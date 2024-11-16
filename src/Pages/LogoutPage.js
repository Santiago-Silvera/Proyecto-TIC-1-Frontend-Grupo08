import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Utils/Auth";

const Logout = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    useEffect(() => {
        const performLogout = async () => {
            await handleLogout();
            navigate("/login");
        };
        performLogout();
    }, [navigate, handleLogout]);

    return (
        <div className="logout-container">
            <h2>Logging out...</h2>
            <p>You are being logged out. Please wait.</p>
        </div>
    );
};

export default Logout;