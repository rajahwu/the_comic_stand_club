import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

export default function FeedPage() {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()

    useEffect(() => {
        if (!sessionUser) {
            console.log("splash page session user", sessionUser)
            return history.push("/")
        }
    }, [sessionUser])

    return (
    <>
    <h1>Feed Page</h1>
    <Link to="/">Home</Link>
    </>
    )
}