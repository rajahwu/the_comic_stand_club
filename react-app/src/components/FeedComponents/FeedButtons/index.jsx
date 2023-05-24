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

  const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "#d2b811",
    backgroundColor: " hsl(240, 5%, 4%)",
    cursor: "pointer",
    opacity: 0.8
  };

  const handleMouseEnter = (e) => {
    console.log(e.target.style)
    console.log("height", e.target.style["height"], "boxShadow", e.target.style["width"])
    e.target.style.color = "#f2eadf";
    e.target.style["box-shadow"] = "2px 2px 2px hsl(120, 64%, 17%)";
    e.target.style["height"] = "2.7rem";
    e.target.style["width"] = "5.3rem";
    e.target.style["opacity"] = 1
  };
  const handleMouseLeave = (e) => {
    e.target.style.color = "#d2b811";
    e.target.style.border = "1px solid #fee52e";
    e.target.style["box-shadow"] = "";
    e.target.style["height"] = "2.5rem";
    e.target.style["width"] = "5rem";
    e.target.style["opacity"] = 0.8;
  };

  return (
    <div className="clubs-feed">
      <Link to={`/feed/${activeFeed.type}s`}>
        <h2 className={FeedButtonsCSS["title"]}>My {activeFeed.type}s</h2>
      </Link>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          className={FeedButtonsCSS["feed-btn"]}
          style={{
            ...btnStyles,
            border:
              activeFeed.type === "club"
                ? "1px solid yellow"
                : "1px solid white",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
            ...btnStyles,
           
            border:
              activeFeed.type === "stand"
                ? "1px solid yellow"
                : "1px solid white",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
            ...btnStyles,
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
            ...btnStyles,
            border: "1px solid #d2b811",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => history.push(`${activeFeed.url}-new`)}
        >
          {activeFeed.type === "stand" ? "Create New Stand" : "Create New Club"}
        </button>
      </div>

      <FeedCards feed={feed} feedUrl={`/${activeFeed.type}`} />
    </div>
  );
}
