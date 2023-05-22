import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { getAllClubsThunk } from "../../store/club";
import { getAllStandsThunk } from "../../store/stand";
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

  const currentContent = clubs ? contentType === "club" ? clubs[id] : stands[id] : null;

  useEffect(() => {
    dispatch(getAllClubsThunk());
    dispatch(getAllStandsThunk());
  }, [dispatch]);


  return (
    <div className={ContentCardCSS.container}>
      <ContentCard contentType={contentType} currentContent={currentContent} />
      <div>
        {contentType === "stand" && (
          <div>
            <select>
              <option value="">Add Character</option>
              {Object.values(characters).slice(0, 5).map((character, i) => (
                <option key={i} value={character?.id}>
                  {character?.name}
                </option>
              ))}
            </select>
            <br />
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
        <button onClick={(e) => history.push(`/${contentType}/${id}/edit`)}>
          Edit
        </button>
        <button
          onClick={(e) => {
            fetch(`/api/${contentType}s/${id}`, {
              method: "DELETE",
            });
            history.push("/feed");
          }}
        >
          Delete
        </button>
      </div>
      <Link to="/feed">Back to feed</Link>
    </div>
  );
}
