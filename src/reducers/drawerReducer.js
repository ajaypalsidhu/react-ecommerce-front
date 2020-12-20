let initialState = false;

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VISIBLE":
      return action.payload;
    default:
      return state;
  }
};
