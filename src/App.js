import React from "react";
import "./styles/App.css";
import {Route, Routes, useNavigate} from "react-router-dom";
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
import Auth from "./Utils/Auth"


// Main App Component
const App = () => {
    let { isLoggedIn } = Auth();
    console.log(isLoggedIn);

  return (
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <Link to="/movieUpload">
              <Button>Upload a Movie</Button>
            </Link>
            <Button onClick={isLoggedIn = false}> restart</Button>
            {!isLoggedIn ? <ProfileMenu /> : <LoggedOutHeader />}
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
