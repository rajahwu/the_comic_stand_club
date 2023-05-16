import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CreatePageCSS from "./CreatePage.module.css";

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
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <h1>{title}</h1>
      <form
        className={CreatePageCSS.createForm}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            clubName,
            description,
            imageUrl,
          };
          console.log(formData);
        }}
      >
        <label>Club Image</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label>Club Name</label>
        <input
          name="name"
          type="text"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />
        <label>Club Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <Link to="/feed">Back to Feed</Link>
    </>
  );
}
