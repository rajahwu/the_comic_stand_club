import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import NavigationCSS from "./Navigation.module.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  
  let ulClassName 
  if(location.pathname === "/")  ulClassName =  NavigationCSS["profile-dropdown-login"] + (showMenu ? "" : " " + NavigationCSS["hidden"])
  else ulClassName = NavigationCSS["profile-dropdown"] + (showMenu ? "" : " " + NavigationCSS["hidden"])
    
  const closeMenu = () => setShowMenu(false);
  const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  }

  return (
    <div className={NavigationCSS.container}>
      <button style={{
        ...btnStyles,
        width: "2.5rem",
        borderRadius: "50%"
      }} onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button style={{
                ...btnStyles,
                height: "1.5rem"
              }} onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
