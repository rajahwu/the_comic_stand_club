import { useState, useEffect } from "react";
import { useBouncer } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubsThunk, createNewClubThunk } from "../../store/club";
import { Link, useLocation, useHistory } from "react-router-dom";

import { getFormType } from "../../utils/forms";

import CreatePageCSS from "./CreatePage.module.css";

export default function CreatePage() {
  useBouncer("logout");
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const clubs = useSelector((state) => state.clubs.allClubs);
  const clubId = clubs[location.pathname.split("/")[2]]?.id;

  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({
    clubName: "",
    description: "",
    imageUrl: "",
    errors: 0,
  });

  const formType = getFormType(location);
  const title = formType["title"];

  useEffect(() => {
    if (clubId) {
      const currentClub = clubs[clubId];
      setClubName(currentClub.name);
      setDescription(currentClub.description);
      setImageUrl(currentClub.imageUrl);
    }
  }, [clubId, clubs]);

  useEffect(() => {
    dispatch(getAllClubsThunk());
  }, [dispatch]);

 
  const handlSubmit = (e) => {
    const formData = {
      clubName,
      description,
      imageUrl,
    };

    e.preventDefault();
    const formErrors = formType["validator"](formData, errors);
    if (Object.values(formErrors).length) {
      if (errors.clubName) setClubName("");
      if (errors.description) setDescription("");
      if (errors.imageUrl) setImageUrl("");
      setErrors({...errors, ...formErrors});
      console.log("validate club errors", errors);
      return;
    }

    if (clubId) {
      fetch(`/api/clubs/${clubId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      history.push("/feed");
      return formData;
    } else {
      dispatch(createNewClubThunk(formData));
      console.log("Start a club forms data", formData);
      history.push("/feed");
      return formData;
    }
  };
        
  return (
    <>
      <h1>{title}</h1>
      <form className={CreatePageCSS.createForm} onSubmit={handlSubmit}>
        <label>
          Club Image
          {<p>{errors?.imageUrl}</p>}
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
