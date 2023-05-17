import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllClubsThunk } from "../../store/club";

export default function ContentPage() {
  const history = useHistory();
  const locaton = useLocation();
  const dispatch = useDispatch();
  const clubId = locaton.pathname[locaton.pathname.length - 1];
  const contentType = locaton.pathname.split("/")[1];
  const clubs = useSelector((state) => state.clubs.allClubs);
  const sessionUser = useSelector((state) => state.session.user);

  const currentClub = clubs[clubId];
  
  useEffect(() => {
    if (!sessionUser) {
      return history.push("/");
    }
  }, [sessionUser, history]);

  useEffect(() => {
    dispatch(getAllClubsThunk());
  }, []);

  return (
    <div>
      <h1>{currentClub.name} content page</h1>
      <p>Club Id : {clubId}</p>
      <p>Description: {currentClub?.description}</p>
      <div>
        <button onClick={(e) => history.push(`/${contentType}/${clubId}/edit`)}>
          Edit
        </button>
        <button
          onClick={(e) => {
            fetch(`/api/clubs/${clubId}`, {
              method: "DELETE",
            });
            history.push("/feed");
          }}
        >
          Delete
        </button>
      </div>
      <Link to="/feed">Back to feed</Link>
    </div>
  );
}
