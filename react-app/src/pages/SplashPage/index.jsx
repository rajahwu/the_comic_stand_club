import OpenModalButton from "../../components/OpenModalButton"
import { LoginFormModal, SignupFormModal } from "../../components"
import SplashPageCSS from "./SplashPage.module.css"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"



export default function SplashPage() {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const closeMenu = () => {
        return
    }

    useEffect(() => {
        if (sessionUser) {
            console.log("splash page session user", sessionUser)
            return history.push("/feed")
        }
    }, [sessionUser])

    return (
        <div className={SplashPageCSS.container}>
            <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />} />

            <OpenModalButton
            buttonText="Login"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
             />

             <button>Demo User</button>
        </div>
    )
}