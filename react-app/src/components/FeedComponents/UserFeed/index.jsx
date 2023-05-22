import FeedButtons from "../FeedButtons";
import { useDispatch } from "react-redux";

export default function UserFeed() {
  return (
    <div
      style={{ borderLeft: "5px solid black", borderRight: "5px solid black", padding: "15px" }}
    >
      <FeedButtons />;
    </div>
  );
}
