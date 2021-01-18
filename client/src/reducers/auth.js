const { REGISTER_SUCCESS } = require("../actions/types");

import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/types";
const InitialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = InitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}
