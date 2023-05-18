import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllClubsThunk } from "../../store/club";
import { getMarvelCharacters } from "../../resources/marvel";
import { CharacterCard } from "../../components";

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

const SearchBar = ({ searchTerms, setSearchTerms }) => {
  const handleClick = () => {};
  return (
    <form>
      <input
        name="startsWith"
        type="text"
        placeholder="starts with"
        value={searchTerms.startsWith ? searchTerms.startsWith : ""}
        onChange={(e) =>
          setSearchTerms({ searchTerms, ...{ startsWith: e.target.value } })
        }
      />
      <button onClick={handleClick}>Search</button>
    </form>
  );
};

export default function FeedPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const clubs = useSelector((state) => state.clubs.allClubs);
  const [rssFeed, setRssFeed] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [comicCharacters, setComicCharactes] = useState([]);

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

  useEffect(() => {
    const fetchComicCharacters = async () => {
      try {
        const comiccharacters = await getMarvelCharacters();
        setComicCharactes(comiccharacters.data.results);
        console.log(comiccharacters.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComicCharacters();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div className="character-feed" style={{ width: "25vw" }}>
        <h2>Character Select</h2>
        <SearchBar searchTerms={searchTerms} setSearchTerms={searchTerms} />
        {comicCharacters.slice(0, 5).map((entry, i) => (
          <div key={i}>
            <CharacterCard
              id={entry.id}
              title={entry.name}
              imageUrl={`${entry.thumbnail.path}.${entry.thumbnail.extension}`}
              description={entry.description}
              urls={entry.urls}
            />
          </div>
        ))}
      </div>

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
