let initialState = false;

export const CODReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COD":
      return action.payload;
    default:
      return state;
  }
};