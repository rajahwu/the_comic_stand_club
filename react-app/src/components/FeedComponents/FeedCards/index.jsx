import { useHistory } from "react-router-dom";
import FeedCardsCSS from "./FeedCards.module.css";

export default function FeedCards({ feed, feedUrl }) {
  const history = useHistory();
  return (
    <div>
      {feed &&
        Object.values(feed).map((entry, index) => (
          <div className={FeedCardsCSS.container} key={index}>
            <div
              onClick={(e) => history.push(`${feedUrl}/${entry.id}`)}
              style={{
                width: "30vw",
                margin: "15px",
                cursor: "pointer",
              }}
            >
              <p style={{ display: "inline-block" }}>
                <img
                  style={{ borderRadius: "50%" }}
                  width={50}
                  height={50}
                  src={entry.imageUrl}
                  alt={entry.name}
                />
              </p>
              <p
                style={{
                  display: "inline-block",
                  marginLeft: "50px",
                  fontSize: "2rem",
                }}
              >
                {entry.name}
              </p>
              <p>{entry.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
