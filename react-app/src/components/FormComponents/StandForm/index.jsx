import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addStand } from "../../../store/stand";
import CreatePageCSS from "../../../pages/CreatePage/CreatePage.module.css";

export default function StandForm({ createForm }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const stands = useSelector((state) => state.stands.allStands);
  const currentStand = stands[createForm.id];

  const [standName, setStandName] = useState(
    currentStand ? currentStand?.name : ""
  );
  const [description, setDescription] = useState(
    currentStand ? currentStand?.description : ""
  );
  const [characters, setCharacters] = useState(
    currentStand ? currentStand?.characters : []
  );
  const [errors, setErrors] = useState({
    standName: "",
    description: "",
    characters: "",
    errors: 0,
  });

  const handlSubmit = async (e) => {
    e.preventDefault();
    createForm.setFormData({
      standName,
      description,
      characters: "characters",
    });

    const formErrors = createForm.validate(errors);
    if (formErrors && Object.values(formErrors).length) {
      if (errors.standName) setStandName("");
      if (errors.description) setDescription("");
      if (errors.characters) setCharacters("");
      setErrors({ ...errors, ...formErrors });
      console.error("validate stand errors", errors);
      return formErrors;
    }

    if (createForm.method === "edit") {
      const status = await createForm.update();
      if (status.errors) {
        setErrors(status.errors);
        return status;
      }
      dispatch(addStand(status));
      history.push(`/stand/${status.id}`);
      return status;
    }

    if (createForm.method === "new") {
      const status = await createForm.create();
      if (status.errors) {
        setErrors(status.error);
        return status;
      }
      dispatch(addStand(status));
      history.push(`/stand/${status.id}`);
      return createForm.formData;
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
            Roster Name
            <div style={{ color: "red", lineHeight: 0 }}>
              {<p>{errors?.standName}</p>}
              {
                <p>
                  {standName.length <= 4 &&
                    standName.length > 0 &&
                    "Roster name must be 5 characters or more."}
                </p>
              }
            </div>
          </label>
          <input
            name="name"
            type="text"
            value={standName}
            onChange={(e) => setStandName(e.target.value)}
          />
          <label>
            Roster Description
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
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            style={{ ...btnStyles }}
            // disabled={Object.values(errors).length > 0}
            type="submit"
            onClick={() => {
              setErrors({
                standName: "",
                description: "",
                characters: "",
                errors: 0,
              });
            }}
          >
            {createForm.title}
          </button>
        </form>
      </div>
      <Link to="/feed">Back to Feed</Link>
    </div>
  );
}
