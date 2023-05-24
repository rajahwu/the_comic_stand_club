// TODO Search Context | State
// TODO Get API Response (COMIC_CHARACTERS)

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CharacterCard } from "../..";
import { getMarvelCharacters } from "../../../resources/marvel";
import { getCharacters } from "../../../store/characters";

const SearchBar = ({ searchTerms, setSearchTerms, comicCharacters }) => {
  const dispatch = useDispatch()
  // TODO Handle Click
  const handleClick = (e) => {
   e.preventDefault()
    console.log(comicCharacters)
    dispatch(getCharacters(comicCharacters))
  } ;
  // const btnStyles = {
  //   borderRadius: "3px",
  //   height: "1.5rem",
  //   width: "3.3rem",
  //   border: "1px solid green",
  //   margin: 0,
  //   color: "white",
  //   backgroundColor: "black",
  //   cursor: "pointer",
  // }

  const btnStyles = {
    borderRadius: "7px",
    height: "1.8rem",
    width: "5rem",
    margin: 0,
    color: "#d2b811",
    backgroundColor: " hsl(240, 5%, 4%)",
    cursor: "pointer",
    opacity: 0.8
  };

  return (
    <div >

  <form style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start"
    }}>
      <input
        name="startsWith"
        type="text"
        placeholder="starts with"
        value={searchTerms.startsWith ? searchTerms.startsWith : ""}
        onChange={(e) =>
          setSearchTerms({ ...searchTerms, ...{ startsWith: e.target.value } })
        }
      />
      <button
       onClick={handleClick} 
       style={{
        ...btnStyles,
        // marginLeft: "5px",
        cursor: "not-allowed"
        }} disabled={false}>Cache</button>
    </form>
    </div>
  );
};

export default function CharacterFeed() {
  const [searchQueryString, setSearchQueryString] = useState({});
  const [comicCharacters, setComicCharacters] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller
    const fetchMarvelCharacters = async () => {
      try {
        const comiccharacters = await getMarvelCharacters(signal, searchQueryString)
        setComicCharacters(comiccharacters.data.results)
      } catch (errors) {
        console.error(errors);
      }
    };
    fetchMarvelCharacters();
    return () => controller.abort();
  }, [searchQueryString]);

  return (
    <div className="character-feed" style={{ width: "25vw" }}>
      <h2>New Recruits</h2>

      <SearchBar
        searchTerms={searchQueryString}
        setSearchTerms={setSearchQueryString}
        comicCharacters={comicCharacters}
      />

      {comicCharacters.slice(0, 5).map((entry, i) => (
        <div key={i}>
          <CharacterCard
            id={entry.id}
            title={entry.name}
            imageUrl={`${entry.thumbnail.path}.${entry.thumbnail.extension}`}
            description={entry.description}
            urls={entry.urls}
          />
        </div>
      ))}
    </div>
  );
}
