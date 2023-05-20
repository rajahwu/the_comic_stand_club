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
  const [feed, setFeed] = useState(clubs)
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
        onClick={() => {
            if(activeFeed.type === "club") history.push('/feed/clubs')
            setActiveFeed({ type: "club", url: "/clubs" })
            if(feed !== clubs) setFeed(clubs)
            }}
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
        onClick={() => {
            setActiveFeed({ type: "stand", url: "stands" })
            if(feed !== stands) setFeed(stands)
            }}
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
        onClick={() => {
            setActiveFeed({ type: "fourm", url: "fourms" })
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
        onClick={() => history.push(`${activeFeed?.url}-new`)}
      >
        Create
      </button>

      <FeedCard feed={feed} feedUrl={`/${activeFeed.type}`} />
    </div>
  );
}
