const GET_ALL_STANDS = "stands/GET_ALL_STANDS";

const getAllStands = (stands) => ({
  type: GET_ALL_STANDS,
  payload: stands,
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


const initialState = { allStands: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STANDS: {
      const newState = {
        ...state,
        allStands: { ...state.stands },
      };
      action.payload.stands.forEach(
        (stand) => (newState.allStands[stand.id] = stand)
      );
      return newState;
    }

    default:
      return state;
  }
}
