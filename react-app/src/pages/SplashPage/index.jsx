import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useBouncer } from "../../hooks";
import {
  LoginFormModal,
  SignupFormModal,
  OpenModalButton,
} from "../../components";
import SplashPageCSS from "./SplashPage.module.css";

export default function SplashPage() {
  const dispatch = useDispatch();
  const closeMenu = () => {
    return;
  };

  useBouncer("login");

  return (
    <div className={SplashPageCSS.container}>
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

      <button
        onClick={() => {
          dispatch(login("demo@aa.io", "password"));
        }}
      >
        Demo User
      </button>
    </div>
  );
}
