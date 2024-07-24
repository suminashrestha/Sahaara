import { ActionTypes } from "../../../constants/action_types";
import AdoptionReducerInterface from "./AdoptionReducerInterface";

const initialState: AdoptionReducerInterface = {
  posts: [],
  post: null,
  isLoading: false,
  error: null,
};


const reducer = (
  state = initialState,
  action: any
): AdoptionReducerInterface => {
  switch (action.type) {
    case ActionTypes.GET_ALL_ADOPTION_POSTS_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case ActionTypes.GET_ALL_ADOPTION_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        isLoading: false,
        error: null,
      };

    case ActionTypes.GET_ALL_ADOPTION_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload.error,
      };

    case ActionTypes.GET_SINGLE_ADOPTION_POST_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case ActionTypes.GET_SINGLE_ADOPTION_POST_SUCCESS:
      return {
        ...state,
        post: action.payload.post,
        isLoading: false,
        error: null,
      };

    case ActionTypes.GET_SINGLE_ADOPTION_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        post: null,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
