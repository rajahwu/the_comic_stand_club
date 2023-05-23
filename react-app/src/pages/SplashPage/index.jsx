import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { getAllClubsThunk } from "../../store/club";
import { getAllStandsThunk } from "../../store/stand";
import { useBouncer } from "../../hooks";
import {
  LoginFormModal,
  SignupFormModal,
  OpenModalButton,
} from "../../components";
import SplashPageCSS from "./SplashPage.module.css";
import { useEffect } from "react";

export default function SplashPage() {
  useBouncer("login");
  const dispatch = useDispatch();
  const closeMenu = () => {
    return;
  };

  useEffect(() => {
    dispatch(getAllClubsThunk());
    dispatch(getAllStandsThunk());
  }, [dispatch]);

  const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  };

  return (
    <div className={SplashPageCSS.container}>
      <div className="splash-page">
        <OpenModalButton
          buttonText="Sign Up"
          onItemClick={closeMenu}
          modalComponent={<SignupFormModal />}
        />

        <OpenModalButton
          buttonText="Login"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              ...btnStyles,
              height: "1.5rem",
              marginTop: "0.7rem",
            }}
            onClick={() => {
              dispatch(login("demo@aa.io", "password"));
            }}
          >
            Demo
          </button>
        </div>
      </div>
    </div>
  );
}
