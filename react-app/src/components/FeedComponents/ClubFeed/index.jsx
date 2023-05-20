import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubsThunk } from "../../../store/club";
import { getAllStandsThunk } from "../../../store/stand";
import { useHistory } from "react-router-dom";
import FeedCard from "../FeedCard";
import FeedButtons from "../FeedButtons";

export default function ClubFeed() {
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.allClubs);
  const stands = useSelector((state) => state.stands.allStands)
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllClubsThunk());
    dispatch(getAllStandsThunk())
  }, [dispatch]);

  return (
    <FeedButtons />
  );
}
