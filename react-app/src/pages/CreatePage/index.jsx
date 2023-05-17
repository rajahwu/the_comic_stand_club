import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubsThunk, createNewClubThunk } from "../../store/club";
import CreatePageCSS from "./CreatePage.module.css";

function createPageTitle(location) {
  let title;
  if (location.pathname === "/clubs-new") {
    title = "Start a new club";
  } else if (/\/club\/\d\/edit/.test(location.pathname)) {
    title = "Edit club";
  } else title = "Create Page";
  return title;
}

export default function CreatePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const clubs = useSelector((state) => state.clubs.allClubs);
  const sessionUser = useSelector((state) => state.session.user);
  
  const clubId = clubs[location.pathname.split("/")[2]]?.id;
  useEffect(() => {
    if (!sessionUser) {
      return history.push("/");
    }
  }, [sessionUser, history]);

  useEffect(() => {
    if (clubId) {
      const currentClub = clubs[clubId];
      setClubName(currentClub.name);
      setDescription(currentClub.description);
      setImageUrl(currentClub.imageUrl);
    }
  }, [clubId, clubs]);

  const title = createPageTitle(location);
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({
    clubName: "",
    description: "",
    imageUrl: "",
    errors: 0,
  });

  useEffect(() => {
    dispatch(getAllClubsThunk());
  }, []);

  return (
    <>
      <h1>{title}</h1>
      <form
        className={CreatePageCSS.createForm}
        onSubmit={async (e) => {
          const formData = {
            clubName,
            description,
            imageUrl,
          };

          e.preventDefault();
          if (formData.clubName?.length <= 0) {
            errors.clubName = "Club name length must be greater than zero";
            errors.errors ? (errors.errors += 1) : (errors.errors = 1);
            setClubName("");
          }

          if (formData.description?.length > 2000) {
            errors.description =
              "Description must be less than 2000 characters";
            errors.errors ? (errors.errors += 1) : (errors.errors = 1);
            setDescription("");
          }
          if (formData.description?.length <= 0) {
            errors.description =
              "Description must be greater than 0 characters";
            errors.errors ? (errors.errors += 1) : (errors.errors = 1);
            setDescription("");
          }
          if (errors.errors) {
            setErrors(errors);
            console.log("Start a club errors", errors);
            return errors;
          }

          if (clubId) {
            await fetch(`/api/clubs/${clubId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
            history.push("/feed");
            return formData;
          } else {
            await dispatch(createNewClubThunk(formData));
            console.log("Start a club forms data", formData);
            history.push("/feed");
            return formData;
          }
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
        <button
          type="submit"
          onClick={() => {
            setErrors({
              clubName: "",
              description: "",
              imageUrl: "",
              errors: 0,
            });
          }}
        >
          {title}
        </button>
      </form>
      <Link to="/feed">Back to Feed</Link>
    </>
  );
}
