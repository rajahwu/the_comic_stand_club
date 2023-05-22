import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import NavigationCSS from "./Navigation.module.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className={NavigationCSS["nav-bar"]}>
      <ul>
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
