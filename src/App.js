import React, {useState, useEffect} from "react";
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


// Main App Component
const App = () => {
    // Se crea la constante para guardar el estado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const doesCookieExist = (name) => {
        const cookies = document.cookie.split('; ');
        return cookies.some(cookie => cookie.startsWith(`${name}=`));
    };

    useEffect(() => {
        const checkCookie = () => {
            if (doesCookieExist('isLoggedIn')) {
                setIsLoggedIn(true);  // Cookie exists, consider logged in
            } else {
                setIsLoggedIn(false); // Cookie doesn't exist, consider logged out
            }
        };

        // Initial check when the component mounts
        checkCookie();

        // Set up a polling interval to check for cookie changes every second
        const interval = setInterval(() => {
            checkCookie();
        }, 1000); // Check every second (you can adjust the interval)

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);



    return (
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
    );
};

export default App;