import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllClubsThunk } from "../../store/club";
import { CharacterFeed } from "../../components";

async function fetchRSS() {
  try {
    const response = await fetch("/api/rss-feed/");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch RSS feed");
    }
  } catch (error) {
    console.error(error);
  }
}

export default function FeedPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const clubs = useSelector((state) => state.clubs.allClubs);
  const [rssFeed, setRssFeed] = useState([]);

  useEffect(() => {
    if (!sessionUser) {
      return history.push("/");
    }
  }, [sessionUser, history]);

  useEffect(() => {
    dispatch(getAllClubsThunk());
  }, [dispatch]);

  useEffect(() => {
    const fetchRssData = async () => {
      try {
        const feed = await fetchRSS();
        setRssFeed(feed);
        // console.log("Rss data: ", feed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRssData();
  }, []);

  return (

    <div style={{ display: "flex" }}>
      
      <CharacterFeed />

      <div className="clubs-feed">
        <h2>Club Feed</h2>
        <button
          style={{
            borderRadius: "50%",
            height: "65px",
            width: "65px",
            margin: "5px",
            backgroundColor: "red",
            color: "white"
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
            cursor: "not-allowed",
            backgroundColor: "green",
            color: "white"
          }}
        >
          Build a Stand
        </button>
        <div>
          {clubs &&
            Object.values(clubs).map((club, index) => (
              <div
                key={index}
                onClick={(e) => history.push(`/club/${club.id}`)}
                style={{
                  width: "30vw",
                  border: "3px solid black",
                  margin: "15px",
                  cursor: "pointer",
                }}
              >
                <p>{club.id}</p>
                <p>{club.name}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="news-feed">
        <h2>News Feed</h2>
        {rssFeed.length &&
          rssFeed?.map((entry, i) => (
            <a key={i} href={entry.link} target="_blank" rel="noreferrer">
              <p>{entry.title}</p>
            </a>
          ))}
      </div>
    </div>
  );
}
