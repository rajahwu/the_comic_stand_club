// TODO Search Context | State
// TODO Get API Response (COMIC_CHARACTERS)

import { useEffect, useState } from "react";
import { CharacterCard } from "../..";
import { getMarvelCharacters } from "../../../resources/marvel";

const SearchBar = ({ searchTerms, setSearchTerms }) => {
  // TODO Handle Click
  const handleClick = () => {};
  return (
    <form>
      <input
        name="startsWith"
        type="text"
        placeholder="starts with"
        value={searchTerms.startsWith ? searchTerms.startsWith : ""}
        onChange={(e) =>
          setSearchTerms({ ...searchTerms, ...{ startsWith: e.target.value } })
        }
      />
      <button onClick={handleClick} style={{cursor: "not-allowed"}} disabled={true}>Search</button>
    </form>
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
        const comiccharacters = await getMarvelCharacters(signal, searchQueryString);
        setComicCharacters(comiccharacters.data.results);
      } catch (errors) {
        console.error(errors);
      }
    };
    fetchMarvelCharacters();
    return () => controller.abort();
  }, [searchQueryString]);

  return (
    <div className="character-feed" style={{ width: "25vw" }}>
      <h2>Character Select</h2>

      <SearchBar
        searchTerms={searchQueryString}
        setSearchTerms={setSearchQueryString}
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
