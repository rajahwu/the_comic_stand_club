import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubsThunk } from "../../../store/club";
import { getAllStandsThunk } from "../../../store/stand";
import FeedCards from "../FeedCards";
import FeedButtonsCSS from "./FeedButtons.module.css";

export default function FeedButtons() {
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands);
  const [activeFeed, setActiveFeed] = useState({ url: "/clubs", type: "club" });
  const [feed, setFeed] = useState(clubs);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllClubsThunk());
    dispatch(getAllStandsThunk());
  }, [dispatch]);

  return (
    <div className="clubs-feed">
    <Link to={`/feed/${activeFeed.type}s`}>
      <h2>My {activeFeed.type}s</h2>

    </Link>
      <div style={{height: "100px"}}>
        <button
          className={FeedButtonsCSS["feed-btn"]}
          style={{
            borderRadius: "50%",
            height: "65px",
            width: "65px",
            margin: "5px",
            backgroundColor: "black",
            color: "white",
            border:
              activeFeed.type === "club"
                ? "1px solid yellow"
                : "1px solid white",
            cursor: "pointer",
          }}
          onClick={() => {
            if (activeFeed.type === "club") history.push("/feed/clubs");
            setActiveFeed({ type: "club", url: "/clubs" });
            setFeed(clubs);
          }}
        >
          {activeFeed.type === "club" ? "View All Clubs" : "Clubs"}
        </button>
        <button
          className={FeedButtonsCSS["feed-btn"]}
          style={{
            borderRadius: "50%",
            height: "65px",
            width: "65px",
            margin: "5px",
            backgroundColor: "black",
            color: "white",
            border:
              activeFeed.type === "stand"
                ? "1px solid yellow"
                : "1px solid white",
            cursor: "pointer",
          }}
          onClick={() => {
            if (activeFeed.type === "stand") history.push("/feed/stands");
            setActiveFeed({ type: "stand", url: "/stands" });
            setFeed(stands);
          }}
        >
          {activeFeed.type === "stand" ? "View All Stands" : "Stands"}
        </button>
        <button
          className={FeedButtonsCSS["feed-btn"]}
          style={{
            borderRadius: "50%",
            height: "65px",
            width: "65px",
            margin: "5px",
            backgroundColor: "black",
            color: "white",
            cursor: "not-allowed",
          }}
          onClick={() => {
            // if (activeFeed.type === "fourm") history.push("/feed/fourms");
            // setActiveFeed({ type: "fourm", url: "/fourms" });
            // setFeed(fourms);
          }}
        >
          Fourms
        </button>
        <button
          className={FeedButtonsCSS["feed-btn"]}
          style={{
            borderRadius: "50%",
            height: "65px",
            width: "65px",
            margin: "5px",
            backgroundColor: "black",
            color: "white",
            border: "1px solid green",
            cursor: "pointer",
          }}
          onClick={() => history.push(`${activeFeed.url}-new`)}
        >
          {activeFeed.type === "stand" ? "Create New Stand" : "Create New Club"}
        </button>
      </div>

      <FeedCards feed={feed} feedUrl={`/${activeFeed.type}`} />
    </div>
  );
}
