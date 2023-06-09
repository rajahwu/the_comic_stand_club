const GET_ALL_CLUBS = "clubs/GET_ALL_CLUBS";
const ADD_CLUB = "clubs/CREATE_CLUB";
const REMOVE_CLUB = "clubs/REMOVE_CLUB"

export const getAllClubs = (clubs) => ({
  type: GET_ALL_CLUBS,
  payload: clubs,
});

export const addClub = (club) => ({
  type: ADD_CLUB,
  payload: club,
});

export const removeClub = (clubId) => ({
  type: REMOVE_CLUB,
  payload: clubId
})

export const getAllClubsThunk = () => async (dispatch) => {
  const response = await fetch("/api/clubs", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getAllClubs(data));
  }
};

const initialState = { allClubs: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CLUBS: {
      const newState = {
        ...state,
        allClubs: { ...state.allClubs },
      };
      action.payload.clubs.forEach(
        (club) => (newState.allClubs[club.id] = club)
      );
      return newState;
    }


    case ADD_CLUB: {
      const newState = {
        ...state,
        allClubs: { ...state.allClubs },
      };
     newState.allClubs[action.payload.id] = action.payload
      return newState;
    }

    case REMOVE_CLUB: {
      const newState = {
        ...state,
        allClubs: { ...state.allClubs }
      }
      delete newState.allClubs[action.payload]
      return newState
    }

    default:
      return state;
  }
}
