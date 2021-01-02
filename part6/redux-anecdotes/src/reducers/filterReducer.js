const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export const setFilter = (value) => {
  return {
    type: "SET_FILTER",
    filter: value,
  };
};

export default filterReducer;
