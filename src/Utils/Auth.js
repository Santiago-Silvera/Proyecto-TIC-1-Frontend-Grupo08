import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    setIsLoggedIn(!!jwtToken);
  }, []);

  const handleLogin = (jwtToken) => {
    if (jwtToken) {
      Cookies.set("jwtToken", jwtToken);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, handleLogin, handleLogout };
};

export default Auth;