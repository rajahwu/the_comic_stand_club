import { useDispatch, useSelector } from "react-redux";
import { getAllClubsThunk } from "../../store/club";
import { getAllStandsThunk } from "../../store/stand";
import { useEffect, useState } from "react";
import { ContentCard } from "../../components";

export default function AllContentPage({ feedType }) {
  const dispatch = useDispatch();
  const [feedState, setFeedState] = useState({});
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands);

  console.log("All Content Page feedType", feedType);

  useEffect(() => {
    if (feedType === "clubs") {
      dispatch(getAllClubsThunk());
      setFeedState(clubs);
      console.log("club useEffed All Content Page clubs", clubs);
      console.log("club useEffed All Content Page feedState", feedState);
    }

    if (feedType === "stands") {
      dispatch(getAllStandsThunk());
      setFeedState(stands);
      console.log("club useEffed All Content Page stands", stands);
      console.log("club useEffed All Content Page feedState", feedState);
    }
  }, []);

  console.log("All Content Page feedState", feedState);

  return(
    <>
      <h1>All {feedType} Content Page</h1>
      {Object.values(feedState).map(((entry , index) => (
        <ContentCard key={index} contentType={feedType} currentContent={entry} />
      )))}
    </> 
  );
}
