import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllClubsThunk } from "../../store/club";
import { CharacterFeed, ClubFeed, NewsFeed } from "../../components";

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
      <ClubFeed clubs={clubs} />
      <NewsFeed rssFeed={rssFeed} />
    </div>
  );
}
