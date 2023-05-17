const GET_ALL_CLUBS = "clubs/GET_ALL_CLUBS";
// const GET_CURRENT_CLUB = "clubs/GET_CURRENT_CLUB";
const CREATE_CLUB = "clubs/CREATE_CLUB";
// const DELETE_CLUB = "clubs/DELETE_CLUB";

const getAllClubs = (clubs) => ({
  type: GET_ALL_CLUBS,
  payload: clubs,
});

const createNewClub = (club) => ({
  type: CREATE_CLUB,
  payload: club,
});

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

export const createNewClubThunk = (club) => async (dispatch) => {
  const response = await fetch("/api/clubs/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(club),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(createNewClub);
  }
};
const initialState = { allClubs: {}, currentClub: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CLUBS: {
      const newState = {
        ...state,
        allClubs: { ...state.clubs },
        currentClub: { ...state.currentClub },
      };
      action.payload.clubs.forEach(
        (club) => (newState.allClubs[club.id] = club)
      );
      return newState;
    }


    case CREATE_CLUB: {
      const newState = {
        ...state,
        allClubs: { ...state.clubs },
        currentClub: { ...state.currentClub },
      };
     newState.currentClub = action.payload.club
     newState.allClubs[action.payload.club.id] = action.payload.club
      return newState;
    }

    default:
      return state;
  }
}
