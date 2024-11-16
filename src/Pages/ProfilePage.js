import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/AxiosConfig";

const Profile = () => {
  const [user, setUser] = useState({})

  const navigate = useNavigate();
  // Solo se puede ver si estas logeado
  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/"); // Se vuelve a la pagina de inicio
    }
  }, [navigate]);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`)); // Busca la cookie

    if (cookie) {
      console.log(cookie.split("=")[1])
      return cookie.split("=")[1]; // Devuelve su valor
    }

    return ""; // String vacio si no existe
  };



  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log("Consiguiendo informacion de usuario");
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

  return <></>;
};

export default Profile;
