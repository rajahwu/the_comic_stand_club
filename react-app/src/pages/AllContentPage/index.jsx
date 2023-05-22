import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllClubsThunk } from "../../store/club";
import { getAllStandsThunk } from "../../store/stand";
import { ContentCard } from "../../components";
import AllContentPageCSS from "./AllContentPage.module.css"

export default function AllContentPage({ feedType }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [feedState, setFeedState] = useState({});
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands);

  useEffect(() => {
    if (feedType === "clubs") {
      dispatch(getAllClubsThunk());
      setFeedState({...clubs});
    }

    if (feedType === "stands") {
      dispatch(getAllStandsThunk());
      setFeedState({...stands});
    }
  }, [dispatch, feedType]);

  return (
    <div className={AllContentPageCSS.container}>
      <Link to="/feed">Back to Feed</Link>
      <h1>All {feedType} Content Page</h1>
      <Link to={`/${feedType}-new`}>Create new {feedType}</Link>
      {Object.values(feedState).map((entry, index) => (
        <ContentCard
          key={index}
          contentType={feedType}
          currentContent={entry}
          onClick={(e) =>
            history.push(
              `${feedType.substring(0, feedType.length - 1)}/${entry.id}`
            )
          }
        />
      ))}
      <Link to="/feed">Back to Feed</Link>
    </div>
  );
}
