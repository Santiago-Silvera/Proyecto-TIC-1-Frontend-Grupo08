import React from "react";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Pages/LogInPage.js";
import SignUp from "./Pages/RegisterPage.js";
import Reserva from "./Pages/ReservationsPage.js";
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

// Main App Component
const App = () => {
  const isLoggedIn = Cookies.get("isLoggedIn");

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <Link to="/reserva" className="link-style">
          <Button>Reservas</Button>
        </Link>
        <Link to="/movieUpload">
          <Button>Upload a Movie</Button>
        </Link>
        {isLoggedIn === "true" ? <ProfileMenu /> : <LoggedOutHeader />}
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
  );
};

export default App;
