import { CharacterFeed, UserFeed, NewsFeed } from "../../components";
import { useBouncer } from "../../hooks";

export default function FeedPage() {
  useBouncer("logout");

  return (
    <div style={{ display: "flex" }}>
      <CharacterFeed />
      <UserFeed />
      <NewsFeed />
    </div>
  );
}
