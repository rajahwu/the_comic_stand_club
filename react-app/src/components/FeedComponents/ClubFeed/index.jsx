import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubsThunk } from "../../../store/club";
import { getAllStandsThunk } from "../../../store/stand";
import { useHistory } from "react-router-dom";
import FeedCard from "../FeedCard";

export default function ClubFeed() {
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands)
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllClubsThunk());
    dispatch(getAllStandsThunk())
  }, [dispatch]);

  return (
    <div className="clubs-feed">
      <h2>Club Feed</h2>
      <button
        style={{
          borderRadius: "50%",
          height: "65px",
          width: "65px",
          margin: "5px",
          backgroundColor: "red",
          color: "white",
          cursor: "pointer"
        }}
        onClick={() => history.push("/clubs-new")}
      >
        Start a Club
      </button>
      <button
        style={{
          borderRadius: "50%",
          height: "65px",
          width: "65px",
          margin: "5px",
          backgroundColor: "green",
          color: "white",
          cursor: "pointer"
        }}
        onClick={() => history.push("/stands-new")}
      >
        Build a Stand
      </button>

      <FeedCard feed={clubs} feedUrl="/club"/>
    </div>
  );
}
