import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ContentPage() {
  const history = useHistory();
  const locaton = useLocation();
  const clubId = locaton.pathname[locaton.pathname.length - 1];
  const contentType = locaton.pathname.split("/")[1];
  const clubs = useSelector(state => state.clubs.allClubs)
  console.log(clubs)
  return (
    <div>
      <h1>{contentType} content page</h1>
      {/* {Object.values(clubs[locaton.pathname.length -1]).map(entry => <p>{entry}</p>)} */}
      <p>ClubId : {clubId}</p>
      <p>Path: {locaton.pathname}</p>
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
