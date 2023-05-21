import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { getAllClubsThunk } from "../../store/club";
import { useBouncer } from "../../hooks";

export default function ContentPage() {
  useBouncer("logout");
  const history = useHistory();
  const locaton = useLocation();
  const dispatch = useDispatch();

  const contentType = locaton.pathname.split("/")[1];
  const id = locaton.pathname.split("/")[2];
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands);

  const currentContent = contentType === "club" ? clubs[id] : stands[id];


  useEffect(() => {
    dispatch(getAllClubsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>{currentContent?.name} content page</h1>
      <p>Club Id : {id}</p>
      <p>Description: {currentContent?.description}</p>
      <div>
        <button onClick={(e) => history.push(`/${contentType}/${id}/edit`)}>
          Edit
        </button>
        <button
          onClick={(e) => {
            fetch(`/api/${contentType}s/${id}`, {
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
