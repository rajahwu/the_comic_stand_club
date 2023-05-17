import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CreatePageCSS from "./CreatePage.module.css";
import { useEffect } from "react";

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
  const [errors, setErrors] = useState({
    clubName: "",
    description: "",
    imageUrl: "",
    errors: 0
  });

 
  return (
    <>
      <h1>{title}</h1>
      <form
        className={CreatePageCSS.createForm}
        onSubmit={(e) => {
          const formData = {
            clubName,
            description,
            imageUrl,
          };
          e.preventDefault();
          if (formData.clubName?.length <= 0) {
            errors.clubName = "Club name length must be greater than zero";
            errors.errors ? (errors.errors += 1) : (errors.errors = 1);
          }

          if (formData.description?.length > 2000) {
            errors.description =
              "Description must be less than 2000 characters";
            errors.errors ? (errors.errors += 1) : (errors.errors = 1);
          }
          if (formData.description?.length <= 0) {
            errors.description =
              "Description must be greater than 0 characters";
            errors.errors ? (errors.errors += 1) : (errors.errors = 1);
          }
          if (errors.errors) {
            setErrors(errors);
            console.log("Start a club errors", errors);
            return errors;
          }

          console.log("Start a club forms data", formData);
          return formData;
        }}
      >
        <label>
          Club Image
          {errors.errors ? <p>{errors.imageUrl}</p> : null}
        </label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label>
          Club Name
          {<p>{errors?.clubName}</p>}
        </label>
        <input
          name="name"
          type="text"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />
        <label>
          Club Description
          {<p>{errors?.description}</p>}
        </label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{title}</button>
      </form>
      <Link to="/feed">Back to Feed</Link>
    </>
  );
}
