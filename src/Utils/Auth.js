import Cookies from "js-cookie";

const Auth = () => {
  // Update localStorage whenever isLoggedIn changes

  const handleLogin = (jwtToken) => {
    if (jwtToken) {
      Cookies.set("jwtToken", jwtToken);
      console.log("Updated cookie 'jwtToken': ", Cookies.get("jwtToken"));
      Cookies.set("isLoggedIn", "true");
      console.log("Updated cookie 'isLoggedIn': ", Cookies.get("isLoggedIn"));
    }
  };

  // Not in use, cookies are manually reset upon logging out
  const handleLogout = () => {};

  return { handleLogin, handleLogout };
};

export default Auth;