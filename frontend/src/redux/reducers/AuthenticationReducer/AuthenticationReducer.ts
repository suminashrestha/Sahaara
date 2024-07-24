import { ActionTypes } from "../../../constants/action_types";
import AuthenticationReducerInterface from "./AuthenticationReducerInterface";

const initialState: AuthenticationReducerInterface = {
  user: JSON.parse(localStorage.getItem("userInfo") || "null"),
  token: localStorage.getItem("token"),
  isLoginSuccessful: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: any
): AuthenticationReducerInterface => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case ActionTypes.LOGIN_SUCCESS:
      console.log(action.payload.user);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoginSuccessful: true,
        isLoading: false,
        error: null,
      };

    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        isLoginSuccessful: action.payload.success,
      };

    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case ActionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoginSuccessful: false,
        isLoading: false,
        error: null,
      };

    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    case ActionTypes.TOGGLE_VOLUNTEER_MODE:
      return {
        ...state,
        user: state.user
          ? { ...state.user, isVolunteer: action.payload }
          : null,
      };

    default:
      return state;
  }
};

export default reducer;