import API from "../../config/baseUrl";
import { Dispatch } from "redux";
import { ActionTypes } from "../../constants/action_types";
import { Action, Actiontype } from "../../constants/common_types";

function getAllAdoptionPosts(): Actiontype {
  return async function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionTypes.GET_ALL_ADOPTION_POSTS_REQUEST,
    });
    try {
      const { data } = await API.get("/api/v1/adoption-posts");
      dispatch({
        type: ActionTypes.GET_ALL_ADOPTION_POSTS_SUCCESS,
        payload: { posts: data.data },
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.GET_ALL_ADOPTION_POSTS_FAILURE,
        payload: {
          error: error.response.data.message,
          success: error.response.data.success,
        },
      });
    }
  };
}

function getSingleAdoptionPost(postId: string): Actiontype {
  return async function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionTypes.GET_SINGLE_ADOPTION_POST_REQUEST,
    });
    try {
      const { data } = await API.get(`/api/v1/adoption-posts/${postId}`);
      // console.log(data)
      dispatch({
        type: ActionTypes.GET_SINGLE_ADOPTION_POST_SUCCESS,
        payload: { post: data.data },
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.GET_SINGLE_ADOPTION_POST_FAILURE,
        payload: {
          error: error.response.data.message,
          success: error.response.data.success,
        },
      });
    }
  };
}

export { getAllAdoptionPosts, getSingleAdoptionPost };
