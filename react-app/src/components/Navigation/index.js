import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import NavigationCSS from "./Navigation.module.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className={NavigationCSS["nav-bar"]}>
      <ul>
        {/* <li className={NavigationCSS["nav-item"]}>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li> */}
        {isLoaded && (
          <li className={NavigationCSS["nav-item"]}>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
