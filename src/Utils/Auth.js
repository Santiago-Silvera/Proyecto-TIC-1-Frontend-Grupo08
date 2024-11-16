import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Auth = () => {
  // Update localStorage whenever isLoggedIn changes

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (jwtToken) => {
    if (jwtToken) {
      Cookies.set("jwtToken", jwtToken);
      console.log("Updated cookie 'jwtToken': ", Cookies.get("jwtToken"));
      Cookies.set("isLoggedIn", "true");
      console.log("Updated cookie 'isLoggedIn': ", Cookies.get("isLoggedIn"));
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("isLoggedIn");
    setIsLoggedIn(false);
  }

  return {isLoggedIn, handleLogin, handleLogout}
};

export default Auth;
