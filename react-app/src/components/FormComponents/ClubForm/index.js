import { useState, useTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addClub } from "../../../store/club";
import CreatePageCSS from "../../../pages/CreatePage/CreatePage.module.css";

export default function ClubForm({ createForm }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.clubs.allClubs);
  const currentClub = clubs[createForm.id];
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

  const [descriptionCharCount, setDescriptionCharCount] = useState(description.length);
  const [clubNameCharCount, setClubNameCharCount] = useState(clubName.length)

  const handlSubmit = async (e) => {
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
      return formErrors;
    }

    if (createForm.method === "edit") {
      const status = await createForm.update();
      if (status.errors) {
        setErrors(status.errors);
        return status;
      }
      dispatch(addClub(status));
      history.push(`/club/${status.id}`);
      return status;
    }

    if (createForm.method === "new") {
      const status = await createForm.create();
      if (status.errors) {
        setErrors(status.errors);
        return;
      }
      dispatch(addClub(status));
      history.push(`/club/${status.id}`);
      return status;
    }
  };

  const btnStyles = {
    borderRadius: "3px",
    height: "2rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  };

  const inputStyles = {
    backgroundColor: "#d9b811",
    height: "1.3rem",
  };

  return (
    <div
      style={{
        width: "50vw",
        marginLeft: "25px",
      }}
    >
      <h1>{createForm.title}</h1>
      <div className="form">
        <form className={CreatePageCSS.createForm} onSubmit={handlSubmit}>
          <label>
            Club Image
            {<p>{errors?.imageUrl}</p>}
          </label>
          <input
            style={{ ...inputStyles }}
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <label>
            Club Name
            <div style={{ color: "red", lineHeight: 0 }}>
              {<p>{errors?.clubName}</p>}
              {
                <p>
                  {clubName.length <= 4 &&
                    clubName.length > 0 &&
                    "Club name must be 5 characters or more."}
                </p>
              }
            </div>
          </label>
          <input
            style={{ ...inputStyles, 
            marginBottom: clubNameCharCount >= 5 ? 0 :  "15px" }}
            name="name"
            type="text"
            value={clubName}
            onChange={(e) => {
              setClubName(e.target.value)
              setClubNameCharCount(e.target.value.length)
              }}
          />
            {clubNameCharCount >= 5 && <p style={{ 
            marginTop: 0,
            marginBottom: "15px", 
            color: clubNameCharCount > 150 ? "red" : "green"
            }}>{clubNameCharCount}/150</p>}
          <label>
            Club Description
            <div style={{ color: "red", lineHeight: 0 }}>
              {<p>{errors?.description}</p>}
              {
                <p>
                  {description.length >= 2000 &&
                    "Description too long, must be less than 2000 characters."}
                </p>
              }
            </div>
          </label>
          <textarea
            style={{ ...inputStyles, height: "5rem" }}
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionCharCount(e.target.value.length);
            }}
          />
          {descriptionCharCount > 0 && <p style={{ 
            marginTop: 0, 
            color: descriptionCharCount > 250 ? "red" : "green"
            }}>{descriptionCharCount}/250</p>}
          <button
            style={{
              ...btnStyles,
              width: "100%",
            }}
            type="submit"
            onClick={() => {
              setErrors({
                clubName: "",
                description: "",
                imageUrl: "",
                errors: 0,
              });
            }}
            disabled={descriptionCharCount > 250 || clubNameCharCount > 150}
          >
            {createForm.title}
          </button>
        </form>
      </div>
      <Link to="/feed">Back to Feed</Link>
    </div>
  );
}
