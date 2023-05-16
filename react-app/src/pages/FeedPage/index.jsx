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


    useEffect(() => {
        fetch("/api/clubs")
        .then(data => data.json())
        .then(data => console.log(data))
    })

    return (
    <>
    <h1>Feed Page</h1>
    <button onClick={() => history.push("/clubs/new")}>Start a Group</button>
    <button style={{cursor: "not-allowed"}}>Build a Stand</button>
    </>
    )
}