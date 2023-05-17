import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllClubsThunk } from "../../store/club";

export default function FeedPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const clubs = useSelector((state) => state.clubs.allClubs);
  const history = useHistory();

  useEffect(() => {
    if (!sessionUser) {
      console.log("splash page session user", sessionUser);
      return history.push("/");
    }
  }, [sessionUser]);

  useEffect(() => {
    dispatch(getAllClubsThunk());
    console.log("feed clubs value: ", clubs);
  }, []);

  return (
    <>
      <h1>Feed Page</h1>
      <button onClick={() => history.push("/clubs-new")}>Start a Club</button>
      <button style={{ cursor: "not-allowed" }}>Build a Stand</button>
      <div>
        {clubs && Object.values(clubs).map((club, index) => (
          <div key={index}
          onClick={e => history.push(`/club/${club.id}`)}
          style={{width: "30vw", border: "3px solid black", margin:"15px", cursor: "pointer" }}
          >
            <p>{club.id}</p>
            <p>{club.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
