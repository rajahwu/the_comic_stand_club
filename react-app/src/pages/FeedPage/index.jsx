// TODO GET ViewState / POST Reactions(comment)
import FeedPageCSS from "./FeedPage.module.css"
import { CharacterFeed, UserFeed, NewsFeed } from "../../components";
import { useBouncer } from "../../hooks";

export default function FeedPage() {
  useBouncer("logout");

  return (
    <div className={FeedPageCSS.container} style={{ display: "flex"}}>
      <CharacterFeed />
      <UserFeed />
      <NewsFeed />
    </div>
  );
}
