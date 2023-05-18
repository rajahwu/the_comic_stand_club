import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { getAllClubsThunk } from "../../store/club";
import { useBouncer } from "../../hooks";

export default function ContentPage() {
  const history = useHistory();
  const locaton = useLocation();
  const dispatch = useDispatch();
  const clubId = locaton.pathname[locaton.pathname.length - 1];
  const contentType = locaton.pathname.split("/")[1];
  const clubs = useSelector((state) => state.clubs.allClubs);

  const currentClub = clubs[clubId];

  useBouncer("logout");

  useEffect(() => {
    dispatch(getAllClubsThunk());
  }, [dispatch]);

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
