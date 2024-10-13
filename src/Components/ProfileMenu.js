import pfp from "../img/pfp.png";
import { useState, useEffect, useRef } from "react";
import "../styles/ProfileMenu.css";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const profileRef = useRef(null);

  const toggleDropdown = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      const dropdownWidth = 150;

      // TODO: no estoy logrando que el menu se coloque abajo del boton de perfil
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: window.scrollX - dropdownWidth,
      });
    }
    setIsOpen(!isOpen);
  };

  // Al hacer click afuera del menu, cerrar el menu
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (profileRef.current && !profileRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const getPfp = () => {
    return pfp;
  };

  return (
    <div className="profile-menu-container">
      <img
        ref={profileRef}
        src={getPfp()}
        width={50}
        height={50}
        alt="Profile"
        className="profile-picture"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div
          className="floating-dropdown"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <ul>
            <Link to="/Profile">
              <li>Profile</li>
            </Link>
            <Link to="/Settings">
              <li>Settings</li>
            </Link>
            <Link to="/">
              <li>Logout</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
