import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllClubsThunk, createNewClubThunk } from "../../../store/club";
import CreatePageCSS from "../../../pages/CreatePage/CreatePage.module.css";

export default function ClubForm({ createForm }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const clubs = useSelector((state) => state.clubs.allClubs);
  const currentClub = clubs[createForm.clubId];
  const [clubName, setClubName] = useState(currentClub ? currentClub.name : "");
  const [description, setDescription] = useState(
    currentClub ? currentClub.description : ""
  );
  const [imageUrl, setImageUrl] = useState(
    currentClub ? currentClub.imageUrl : ""
  );
  const [errors, setErrors] = useState({
    clubName: "",
    description: "",
    imageUrl: "",
    errors: 0,
  });

  useEffect(() => {
    dispatch(getAllClubsThunk());
  }, [dispatch]);

  const handlSubmit = (e) => {
    e.preventDefault();
    createForm.setFormData({
      clubName,
      description,
      imageUrl,
    });

    const formErrors = createForm.validate(errors);
    if (formErrors && Object.values(formErrors).length) {
      if (errors.clubName) setClubName("");
      if (errors.description) setDescription("");
      if (errors.imageUrl) setImageUrl("");
      setErrors({ ...errors, ...formErrors });
      console.error("validate club errors", errors);
      return;
    }

    if (createForm.method === "edit") {
      const status = createForm.update();
      if (status.errors) {
        setErrors(status.errors);
        return;
      }
      history.push("/feed");
      return createForm.formData;
    }

    if (createForm.method === "new") {
      // dispatch(createNewClubThunk(createForm.formData));
      const status = createForm.create()
      if (status.errors) {
        setErrors(status.errors)
        return;
      }
      console.log("Start a club forms data", createForm.formData);
      history.push("/feed");
      return createForm.formData;
    }
  };

  return (
    <>
      <h1>{createForm.title}</h1>
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
          {createForm.title}
        </button>
      </form>
      <Link to="/feed">Back to Feed</Link>
    </>
  );
}
