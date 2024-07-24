import { ActionTypes } from "../../../constants/action_types";
import RescueReducerInterface from "./RescueReducerInterface";

const initialState: RescueReducerInterface = {
  posts: [],
  isLoading: false,
  error: null,
  post: null
};

const reducer = (state = initialState, action: any): RescueReducerInterface => {
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

    case ActionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.updatedPost._id
            ? {
                ...post,
                comments: post.comments?.filter(
                  (c) => c._id !== action.payload.deletedComment._id
                ),
              }
            : post
        ),
        isLoading: false,
        error: null,
      };

      case ActionTypes.GET_SINGLE_RESCUE_POST_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

      case ActionTypes.GET_SINGLE_RESCUE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload.post,
        isLoading: false,
        error: null,
      };

    case ActionTypes.GET_SINGLE_RESCUE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload.error,
      };

    case ActionTypes.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case ActionTypes.ADD_COMMENT_SUCCESS:
      
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: [...(post?.comments ?? []), newComment],
              }
            : post
        ),
        isLoading: false,
        error: null,
      };

    case ActionTypes.ADD_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case ActionTypes.LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                likes: action.payload.updatedLikes,
              }
            : post
        ),
        isLoading: false,
        error: null,
      };

    case ActionTypes.LIKE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

      

    default:
      return state;
  }
};

export default reducer;