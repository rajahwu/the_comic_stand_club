import { useEffect } from "react";
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

  const btnStyleOverwrite = {
    height: "1.5rem",
    marginTop: "0.7rem",
  };

  return (
    <div className={SplashPageCSS["container"]}>
      <div>
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
        <div className={SplashPageCSS["demo-btn-container"]}>
          <button
            style={{ ...btnStyleOverwrite }}
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
