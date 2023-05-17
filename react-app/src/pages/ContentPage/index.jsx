import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

export default function ContentPage() {
  const history = useHistory();
  const locaton = useLocation();
  return (
    <>
      <h1>Content Page</h1>
      <p>{locaton.pathname}</p>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <Link to="/feed">Back to feed</Link>
    </>
  );
}
