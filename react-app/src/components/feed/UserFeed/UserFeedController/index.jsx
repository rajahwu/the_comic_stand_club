import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubsThunk } from "../../../../store/club";
import { getAllStandsThunk } from "../../../../store/stand";
import UserFeedContentCards from "../UserFeedContentCards";
import FeedButtonsCSS from "./UserFeedController.module.css";

export default function UserFeedController() {
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
    <div className={FeedButtonsCSS["user-feed"]}>
      <div className={FeedButtonsCSS["container"]}>
        <button
          style={{
            border:
              activeFeed.type === "club"
                ? "1px solid yellow"
                : "1px solid white",
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
          style={{
            border:
              activeFeed.type === "stand"
                ? "1px solid yellow"
                : "1px solid white",
          }}
          onClick={() => {
            if (activeFeed.type === "stand") history.push("/feed/stands");
            setActiveFeed({ type: "stand", url: "/stands" });
            setFeed(stands);
          }}
        >
          {activeFeed.type === "stand" ? "View All Rosters" : "Rosters"}
        </button>
        <button
          style={{
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
          style={{
            border: "1px solid #d2b811",
          }}
          onClick={() => history.push(`${activeFeed.url}-new`)}
        >
          {activeFeed.type === "stand" ? "Build New Roster" : "Start New Club"}
        </button>
      </div>
      <Link to={`/feed/${activeFeed.type}s`}>
        <h2>My {activeFeed.type === "stand" ? "Roster" : activeFeed.type}s</h2>
      </Link>

      <UserFeedContentCards feed={feed} feedUrl={`/${activeFeed.type}`} />
    </div>
  );
}
