import { ActionTypes } from "../../../constants/action_types";
import VolunteerReducerInterface from "./VolunteerReducerInterface";


const initialState: VolunteerReducerInterface = {
  posts: [],
  isLoading: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: any
): VolunteerReducerInterface => {
  switch (action.type) {
    case ActionTypes.GET_ALL_VOLUNTEER_POSTS_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case ActionTypes.GET_ALL_VOLUNTEER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        success: true,
        isLoading: false,
        error: null,
      };

    case ActionTypes.GET_ALL_VOLUNTEER_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        posts: [],
        success: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;