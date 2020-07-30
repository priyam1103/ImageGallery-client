import { AUTH_USER, UNAUTH_USER } from "./actionType";

export const authUser = (data) => {
  localStorage.setItem("tokenn", data.token);
  return {
    type: AUTH_USER,
    payload: data,
  };
};

export const removeUser = () => {
  localStorage.removeItem("tokenn");
  return {
    type: UNAUTH_USER,
    payload: null,
  };
};
