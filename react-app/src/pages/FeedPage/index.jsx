import { CharacterFeed, ClubFeed, NewsFeed } from "../../components";
import { useBouncer } from "../../hooks";

export default function FeedPage() {
  useBouncer("logout");

  return (
    <div style={{ display: "flex" }}>
      <CharacterFeed />
      <ClubFeed />
      <NewsFeed />
    </div>
  );
}
