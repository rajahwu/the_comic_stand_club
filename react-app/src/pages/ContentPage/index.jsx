import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { getAllClubsThunk, removeClub } from "../../store/club";
import { getAllStandsThunk, removeStand } from "../../store/stand";
import { useBouncer } from "../../hooks";
import { ContentCard } from "../../components";
import ContentCardCSS from "./ContentPage.module.css";

export default function ContentPage() {
  useBouncer("logout");
  const history = useHistory();
  const locaton = useLocation();
  const dispatch = useDispatch();

  const contentType = locaton.pathname.split("/")[1];
  const id = locaton.pathname.split("/")[2];
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands);
  const characters = useSelector((state) => state.characters.characters);

  const currentContent = contentType === "club" ? clubs[id] : stands[id];

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
    opacity: 0.8,
  };

  return (
    <div className={ContentCardCSS.container}>
      <ContentCard contentType={contentType} currentContent={currentContent} />
      <div>
        {contentType === "stand" && (
          <div>
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
            <br />
            {Object.values(characters).length > 0 && (
              <select>
                <option value="">Roster</option>
                {Object.values(characters)
                  .slice(0, 5)
                  .map((character, i) => (
                    <option key={i} value={character?.id}>
                      {character?.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        )}
        <button
          style={{ ...btnStyles }}
          onClick={(e) => history.push(`/${contentType}/${id}/edit`)}
        >
          Edit
        </button>
        <button
          style={{ ...btnStyles }}
          onClick={async (e) => {
            const response = await fetch(`/api/${contentType}s/${id}`, {
              method: "DELETE",
            });

            if (response.ok) {
              const success = await response.json();
              console.log(`${contentType} delete success `, success);
              if (contentType === "club") dispatch(removeClub(id));
              if (contentType === "stand") dispatch(removeStand(id));
              history.push("/feed");
              return success;
            }
            const errors = await response.json();
            console.log(`${contentType} delete fail, `, errors);
            return errors;
          }}
        >
          Delete
        </button>
      </div>
      <Link to="/feed">Back to feed</Link>
    </div>
  );
}
