import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllClubsThunk, createNewClubThunk } from "../../../store/club";
import CreatePageCSS from "../../../pages/CreatePage/CreatePage.module.css";

export default function ClubForm({ createForm }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const clubs = useSelector((state) => state.clubs.allClubs);
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
    }, [dispatch]);

    useEffect(() => {
        if (createForm.type[1] === "edit") {
            const currentClub = clubs[createForm.clubId];
            setClubName(currentClub.name);
            setDescription(currentClub.description);
            setImageUrl(currentClub.imageUrl);
        }
    }, [createForm.clubId, createForm.clubs, createForm.type, clubs]);

    const handlSubmit = (e) => {
        const formData = {
            clubName,
            description,
            imageUrl,
        };

        createForm.setFormData(formData);

        e.preventDefault();
        const formErrors = createForm.validate(errors);
        if (formErrors && Object.values(formErrors).length) {
            if (errors.clubName) setClubName("");
            if (errors.description) setDescription("");
            if (errors.imageUrl) setImageUrl("");
            setErrors({ ...errors, ...formErrors });
            console.log("validate club errors", errors);
            return;
        }
        if (createForm.type[1] === "edit") {
            history.push("/feed");
            return createForm.update()
        } else {
            dispatch(createNewClubThunk(formData));
            console.log("Start a club forms data", formData);
            history.push("/feed");
            return formData;
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
    )
};


