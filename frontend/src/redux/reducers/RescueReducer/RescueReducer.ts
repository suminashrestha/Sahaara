import { ActionTypes } from "../../../constants/action_types";
import RescueReducerInterface from "./RescueReducerInterface";

const initialState: RescueReducerInterface = {
  posts: [],
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: any
): RescueReducerInterface => {
  switch (action.type) {
    case ActionTypes.GET_ALL_RESCUE_POSTS_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case ActionTypes.GET_ALL_RESCUE_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        isLoading: false,
        error: null,
      };

    case ActionTypes.GET_ALL_RESCUE_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;

