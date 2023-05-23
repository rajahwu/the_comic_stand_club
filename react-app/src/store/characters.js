const GET_CHARACTERS = "character/CHARACTERS";

export const getCharacters = (characters) => ({
  type: GET_CHARACTERS,
  payload: characters,
});


const initialState = { characters: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS: {
      const newState = {
        ...state,
        characters: { ...state.characters },
      };
      action.payload.forEach((character, index) => {
        newState.characters[index] = character
      })
      return newState;
    }

    default:
      return state;
  }
}
