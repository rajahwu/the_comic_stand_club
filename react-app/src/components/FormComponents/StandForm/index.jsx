import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import { getAllClubsThunk, createNewClubThunk } from "../../../store/club";
import { getAllStandsThunk } from "../../../store/stand";
import CreatePageCSS from "../../../pages/CreatePage/CreatePage.module.css";

export default function StandForm({ createForm }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const stands = useSelector(
    (state) => state.stands.allStands
  );
// const stands = []
// console.log("stand form stand selectoer", stands)
  const currentStand = stands ? stands[createForm.id] : {} 
  // const currentStand = stands[createForm.id ? stands[createForm.id] : null];
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
    clubName: "",
    description: "",
    imageUrl: "",
    errors: 0,
  });

  useEffect(() => {
    dispatch(getAllStandsThunk());
  }, [dispatch]);

  const handlSubmit = (e) => {
    e.preventDefault();
    createForm.setFormData({
      standName,
      description,
      characters: characters.length ? characters.join(",") : "",
    });

    const formErrors = createForm.validate(errors);
    if (formErrors && Object.values(formErrors).length) {
      if (errors.standName) setStandName("");
      if (errors.description) setDescription("");
      if (errors.characters) setCharacters("");
      setErrors({ ...errors, ...formErrors });
      console.error("validate stand errors", errors);
      return;
    }

    if (createForm.type[1] === "edit") {
      const status = createForm.update();
      if (status.errors) {
        setErrors(status.errors);
        return;
      }
      history.push("/feed");
      return createForm.formData;
    }

    if (createForm.type[1] === "new") {
    //   dispatch(createNewStandThunk(createForm.formData));
      const status = createForm.create()
      .then((response) => console.log("standForm create response", response))
      if(status.errors) {
        setErrors(status.error)
        return;
      }

      console.log("Start a stand forms data", createForm.formData);
      history.push("/feed");
      return createForm.formData;
    }
  };

  return (
    <>
      <h1>{createForm.title}</h1>
      <form className={CreatePageCSS.createForm} onSubmit={handlSubmit}>
        <label>
          Characters
          {<p>{errors?.characters}</p>}
        </label>
        <input
          type="text"
          name="characters"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
        />
        <label>
          Stand Name
          {<p>{errors?.standName}</p>}
        </label>
        <input
          name="name"
          type="text"
          value={standName}
          onChange={(e) => setStandName(e.target.value)}
        />
        <label>
          Stand Description
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
