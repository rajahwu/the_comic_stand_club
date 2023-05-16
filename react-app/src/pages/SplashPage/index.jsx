import OpenModalButton from "../../components/OpenModalButton"
import { LoginFormModal, SignupFormModal } from "../../components"
import SplashPageCSS from "./SplashPage.module.css"

const closeMenu = () => {
    return
}

export default function SplashPage() {
    return (
        <div className={SplashPageCSS.container}>
            <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />} />

            <OpenModalButton
            buttonText="Login Up"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
             />
        </div>
    )
}