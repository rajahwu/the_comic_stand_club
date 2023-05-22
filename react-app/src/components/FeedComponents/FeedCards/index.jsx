import { useHistory } from "react-router-dom";


export default function FeedCards({ feed, feedUrl }) {
    const history = useHistory()
  return (
    <div>
      {feed &&
        Object.values(feed).map((entry, index) => (
          <div
            key={index}
            onClick={(e) => history.push(`${feedUrl}/${entry.id}`)}
            style={{
              width: "30vw",
              // border: "3px solid black",
              margin: "15px",
              cursor: "pointer",
            }}
          >
            {/* <p>{entry.id}</p> */}
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
        ))}
    </div>
  );
}
