import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllClubsThunk } from "../../../store/club";
import { getAllStandsThunk } from "../../../store/stand";
import FeedCards from "../FeedCards";

export default function FeedButtons({ children }) {
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands);
  const [activeFeed, setActiveFeed] = useState({ url: "/clubs", type: "club" });
  const [feed, setFeed] = useState({})
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllClubsThunk())
    dispatch(getAllStandsThunk())
  },[dispatch])
  
  return (
    <div className="clubs-feed">
      <h2>User Feed</h2>
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
        onClick={() => {
            if(activeFeed.type === "club") history.push('/feed/clubs')
            setActiveFeed({ type: "club", url: "/clubs" })
            setFeed(clubs)
            }}
      >
        {activeFeed.type === "club" ? "View All Clubs" : "Clubs"}
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
        onClick={() => {
            if(activeFeed.type === "stand") history.push('/feed/stands')
            setActiveFeed({ type: "stand", url: "/stands" })
            setFeed(stands)
            }}
      >
        {activeFeed.type === "stand" ? "View All Stands" : "Stands"}
      </button>
      <button
        style={{
          borderRadius: "50%",
          height: "65px",
          width: "65px",
          margin: "5px",
          backgroundColor: "red",
          color: "white",
          cursor: "not-allowed",
        }}
        onClick={() => {
            setActiveFeed({ type: "fourm", url: "/fourms" })
            // if(feed !== fourm) setFeed(fourm)
            }}
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
        onClick={() => history.push(`${activeFeed.url}-new`)}
      >
        {activeFeed.type === "stand" ? "Create New Stand" : "Create New Club"}
      </button>

      <FeedCards feed={feed} feedUrl={`/${activeFeed.type}`} />
    </div>
  );
}
