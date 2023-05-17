import { useLocation } from "react-router-dom";
import { getMarvelCharactersById } from "../../resources/marvel";

export default function CharacterCardImage({ imageUrl, contentId }) {
  // const navigate = useNavigate();
  const location = useLocation();

  // const handleClick = (e) => {
  //   getMarvelCharactersById(contentId).then((data) =>
  //     console.log("Character Page Resource", data.data.results[0])
  //   );
  //   return navigate(`/characters/${contentId}`);
  // };

  return (
    <img
      style={{ borderRadius: "5px", cursor: location.pathname === "/" ? "pointer" : "auto" }}
      className="card-image"
      src={imageUrl}
      alt=""
      width={150}
      height={150}
      // onClick={handleClick}
      onMouseEnter={(e) => { if (location.pathname === "/") e.target.style.border = "3px solid yellow" }}
      onMouseLeave={(e) => { if (location.pathname === "/") e.target.style.border = "none" }}
    />
  );
}
