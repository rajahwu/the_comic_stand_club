import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllClubsThunk } from "../../../store/club";
import { getAllStandsThunk } from "../../../store/stand";
import FeedButtons from "../FeedButtons";

export default function ClubFeed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClubsThunk());
    dispatch(getAllStandsThunk())
  }, [dispatch]);

  return (
    <FeedButtons />
  );
}
