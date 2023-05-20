import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllClubsThunk } from "../../../store/club";
import { getAllStandsThunk } from "../../../store/stand";
import FeedCard from "../FeedCard";

export default function FeedButtons({ children }) {
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands);
  const [activeFeed, setActiveFeed] = useState({ url: "/feed", type: "club" });
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllClubsThunk());
    //   dispatch(getAllStandsThunk())
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
          cursor: "pointer",
        }}
        onClick={() => setActiveFeed({ type: "club", url: "/clubs" })}
      >
        Clubs
      </button>
      <button
        style={{
          borderRadius: "50%",
          height: "65px",
          width: "65px",
          margin: "5px",
          backgroundColor: "green",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => setActiveFeed({ type: "stand", url: "stands" })}
      >
        Stands
      </button>
      <button
        style={{
          borderRadius: "50%",
          height: "65px",
          width: "65px",
          margin: "5px",
          backgroundColor: "red",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => setActiveFeed({ type: "fourm", url: "fourms" })}
      >
        Fourms
      </button>
      <button
        style={{
          borderRadius: "50%",
          height: "65px",
          width: "65px",
          margin: "5px",
          backgroundColor: "green",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => history.push(`${activeFeed?.url}-new`)}
      >
        Create
      </button>

      <FeedCard feed={clubs} feedUrl={`/${activeFeed.type}`} />
    </div>
  );
}
