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
  useBouncer("login");
  const dispatch = useDispatch();
  const closeMenu = () => {
    return;
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

        <button
          onClick={() => {
            dispatch(login("demo@aa.io", "password"));
          }}
        >
          Demo User
        </button>
      </div>
    </div>
  );
}
