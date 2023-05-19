const GET_ALL_STANDS = "stands/GET_ALL_STANDS";
const CREATE_STAND = "stands/CREATE_STAND";

const getAllStands = (stands) => ({
  type: GET_ALL_STANDS,
  payload: stands,
});

const createNewClub = (club) => ({
  type: CREATE_STAND,
  payload: club,
});

export const getAllStandsThunk = () => async (dispatch) => {
  const response = await fetch("/api/stands", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(getAllStands(data));
  }
};

export const createNewClubThunk = (club) => async (dispatch) => {
  const response = await fetch("/api/stands/new", {
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
const initialState = { allstands: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STANDS: {
      const newState = {
        ...state,
        allstands: { ...state.stands },
      };
      action.payload.stands.forEach(
        (stand) => (newState.allstands[stand.id] = stand)
      );
      return newState;
    }


    case CREATE_STAND: {
      const newState = {
        ...state,
        allstands: { ...state.stands },
      };
     newState.allstands[action.payload.club.id] = action.payload.club
      return newState;
    }

    default:
      return state;
  }
}
