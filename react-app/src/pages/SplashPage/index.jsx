import OpenModalButton from "../../components/OpenModalButton"
import { LoginFormModal, SignupFormModal } from "../../components"
import SplashPageCSS from "./SplashPage.module.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { login } from "../../store/session"



export default function SplashPage() {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const closeMenu = () => {
        return
    }

    useEffect(() => {
        if (sessionUser) {
            return history.push("/feed")
        }
    }, [sessionUser, history])

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

             <button onClick={() => {
                dispatch(login("demo@aa.io", "password"))
             }}>Demo User</button>
        </div>
    )
}