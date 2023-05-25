import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FeedCardsCSS from "./FeedCards.module.css";

export default function FeedCards({ feed, feedUrl }) {
  const history = useHistory();
  const characters = useSelector((state) => state.characters.characters);

  const contentType = feedUrl.split("/")[1];
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
              <div style={{ display: "flex", flexDirection:"row" }}>
                {contentType === "club" && (
                  <img
                    style={{ 
                      borderRadius: "50%", 
                      border: "1px solid #d9b811",
                      maxWidth: "50px",
                      maxHeight: "50px"
                       }}
                    width={50}
                    height={50}
                    src={entry.imageUrl}
                    alt={entry.name}
                  />
                )}
              
              <h3
                style={{
                  display: "inline-block",
                  marginLeft: "50px",
                  fontSize: "2rem",
                  maxWidth: "20vw",
                  overflowWrap: "break-word"
                }}
              >
                {entry.name}
              </h3>
              </div>

              {contentType === "stand" && (
                <div>
                  {/* <select>
                    <option value="">Add Character</option>
                    {Object.values(characters)
                      .slice(0, 5)
                      .map((character, i) => (
                        <option key={i} value={character?.id}>
                          {character?.name}
                        </option>
                      ))}
                  </select>
                  <br /> */}
                  {Object.values(characters)
                    .slice(0, 5)
                    .map((character, i) => (
                      <img
                        key={i}
                        alt=""
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        width="75px"
                        height="75px"
                      />
                    ))}
                </div>
              )}
              <p style={{overflowWrap: "break-word"}}>{entry.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
