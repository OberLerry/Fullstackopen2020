const initialNotification = "This is a test message";

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};
let timeoutID;
export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, time * 1000);
  };
};

export default notificationReducer;
