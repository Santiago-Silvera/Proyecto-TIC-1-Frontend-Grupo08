import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Auth = () => {
  // Update localStorage whenever isLoggedIn changes

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [utilVar, setUtilVar] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    setIsLoggedIn(!!jwtToken);
  }, [utilVar]);

  const handleLogin = (jwtToken) => {
    if (jwtToken) {
      Cookies.set("jwtToken", jwtToken);
      console.log("Updated cookie 'jwtToken': ", Cookies.get("jwtToken"));
      Cookies.set("isLoggedIn", "true");
      console.log("Updated cookie 'isLoggedIn': ", Cookies.get("isLoggedIn"));
      setUtilVar(true)
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("isLoggedIn");
    setUtilVar(false)
  }

  return {isLoggedIn, handleLogin, handleLogout}
};

export default Auth;



