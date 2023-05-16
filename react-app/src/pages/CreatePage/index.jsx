import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function createPageTitle(location) {
  let title;
  switch (location.pathname) {
    case "/clubs/new": {
      title = "Start a new club";
      break;
    }
    default: {
      title = "Create Page";
    }
  }
  return title;
}

export default function CreatePage() {
  const location = useLocation();
  const title = createPageTitle(location);

  return (
    <>
      <h1>{title}</h1>
      <Link to="/feed">Back to Feed</Link>
    </>
  );
}
