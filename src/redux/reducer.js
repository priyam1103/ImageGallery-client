import { AUTH_USER, UNAUTH_USER } from "./actionType";

const initialState = {
  user: "",
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload.user_,
        token: action.payload.token,
      };
    case UNAUTH_USER:
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
