import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/AxiosConfig";

const Profile = () => {
  const [user, setUser] = useState({})

  const navigate = useNavigate();
  // You only can see it if you are logged in
  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/"); // Go to homepage
    }
  }, [navigate]);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`)); // Busca la cookie

    if (cookie) {
      console.log(cookie.split("=")[1])
      return cookie.split("=")[1]; // Get the value
    }

    return "";
  };



  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log("Getting user data");
        const userToken = getCookieValue("jwtToken")
        const response = await axiosInstance.get(
            `/api/v1/users/userInfo?token=${userToken}`
        )
        setUser(response.data);
        console.log(response);

      } catch (err) {
        console.log(err)
      }
    }
    getUserData()
  }, [])

  // Not implemented due to problems with the endpoint
  return <></>;
};

export default Profile;
