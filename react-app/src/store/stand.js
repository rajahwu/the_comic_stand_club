const GET_ALL_STANDS = "stands/GET_ALL_STANDS";
const ADD_STAND = "stands/CREATE_STAND";
const REMOVE_STAND = "stands/REMOVE_STAND"


const getAllStands = (stands) => ({
  type: GET_ALL_STANDS,
  payload: stands,
});

export const addStand = (stand) => ({
  type: ADD_STAND,
  payload: stand
})

export const removeStand = (standId) => ({
  type: REMOVE_STAND,
  payload: standId
})


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


const initialState = { allStands: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STANDS: {
      const newState = {
        ...state,
        allStands: { ...state.allStands },
      };
      action.payload.stands.forEach(
        (stand) => (newState.allStands[stand.id] = stand)
      );
      return newState;
    }

    case ADD_STAND: {
      const newState = {
        ...state,
        allStands: { ...state.allStands },
      };
     newState.allStands[action.payload.id] = action.payload
      return newState;
    }

    case REMOVE_STAND: {
      const newState = {
        ...state,
        allStands: { ...state.allStands }
      }
      delete newState.allStands[action.payload]
      return newState
    }


    default:
      return state;
  }
}
