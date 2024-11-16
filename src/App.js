import React, {useState, useEffect, createContext, useContext } from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Pages/LogInPage.js";
import SignUp from "./Pages/RegisterPage.js";
import Reserva from "./Components/Reserva.js";
import ProfileMenu from "./Components/ProfileMenu";
import LoggedOutHeader from "./Components/LoggedOutHeader.js";
import MovieList from "./Components/MovieList.js";
import MovieUpload from "./Pages/MovieUploadPage.js";
import Home from "./Pages/HomePage.js";
import { Link } from "react-router-dom";
import logo from "./logo.jpeg";
import Button from "./Components/Button.js";
import Cookies from "js-cookie";
import Profile from "./Pages/ProfilePage.js";
import Logout from "./Pages/LogoutPage.js";

// Para que se actualize el header
// Se crea un contexto que guarda si se esta logeado
const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value) => {},
});

const useLogin = () => useContext(LoginContext);

// Main App Component
const App = () => {
  // Se crea la constante para guardar el estado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Actializar el estado
  useEffect(() => {
    // Check the cookie when the component mounts
    const loggedInCookie = Cookies.get("isLoggedIn");
    setIsLoggedIn(loggedInCookie === "true");
  }, []);

  return (
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <Link to="/movieUpload">
              <Button>Upload a Movie</Button>
            </Link>
            {isLoggedIn ? <ProfileMenu /> : <LoggedOutHeader />}
          </header>

          <div className="App-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/logIn" element={<LogIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/reserva" element={<Reserva />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movieUpload" element={<MovieUpload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </LoginContext.Provider>
  );
};

export default App;
