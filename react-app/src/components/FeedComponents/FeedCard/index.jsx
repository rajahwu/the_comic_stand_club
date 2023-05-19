import { useHistory } from "react-router-dom";

export default function FeedCard({ feed, feedUrl }) {
    const history = useHistory()
  return (
    <div>
      {feed &&
        Object.values(feed).map((club, index) => (
          <div
            key={index}
            onClick={(e) => history.push(`${feedUrl}/${club.id}`)}
            style={{
              width: "30vw",
              border: "3px solid black",
              margin: "15px",
              cursor: "pointer",
            }}
          >
            {/* <p>{club.id}</p> */}
            <p style={{ display: "inline-block" }}>
              <img
                style={{ borderRadius: "50%" }}
                width={50}
                height={50}
                src={club.imageUrl}
                alt="club"
              />
            </p>
            <p
              style={{
                display: "inline-block",
                marginLeft: "50px",
                fontSize: "2rem",
              }}
            >
              {club.name}
            </p>
            <p>{club.description}</p>
          </div>
        ))}
    </div>
  );
}
