import API from "../../config/baseUrl";
import { Dispatch } from "redux";
import { ActionTypes } from "../../constants/action_types";
import { Action, Actiontype } from "../../constants/common_types";

function getAllRescuePosts(): Actiontype {
  return async function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionTypes.GET_ALL_RESCUE_POSTS_REQUEST,
    });
    try {
      const { data } = await API.get("/api/v1/rescue-posts");
      console.log(data.data)
      dispatch({
        type: ActionTypes.GET_ALL_RESCUE_POSTS_SUCCESS,
        payload: { posts: data.data },
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.GET_ALL_RESCUE_POSTS_FAILURE,
        payload: {
          error: error.response.data.message,
          success: error.response.data.success,
        },
      });
    }
  };
}

function getSingleRescuePost(postId: string): Actiontype {
  return async function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionTypes.GET_SINGLE_RESCUE_POST_REQUEST,
    });
    try {
      const { data } = await API.get(`/api/v1/rescue-posts/${postId}`);
      dispatch({
        type: ActionTypes.GET_SINGLE_RESCUE_POST_SUCCESS,
        payload: { post: data.data },
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.GET_SINGLE_RESCUE_POST_FAILURE,
        payload: {
          error: error.response.data.message,
          success: error.response.data.success,
        },
      });
    }
  };
}

function deleteComment(postId: string, commentId: string): Actiontype {
  return async function (dispatch: Dispatch<Action>) {
    try {
      const { data } = await API.delete(
        `/api/v1/rescue-posts/${postId}/comments/${commentId}`
      );
      console.log("--delete", data);
      dispatch({
        type: ActionTypes.DELETE_COMMENT_SUCCESS,
        payload: {
          updatedPost: data.data.updatedPost,
          deletedComment: data.data.deletedComment,
        },
      });
    } catch (error: any) {
      console.log("----error", error);
      dispatch({
        type: ActionTypes.DELETE_COMMENT_FAILURE,
        payload: {
          error: error?.response?.data?.message ?? "something went wrong",
        },
      });
    }
  };
}

function addComment(postId: string, comment: string): Actiontype {
  return async function (dispatch: Dispatch<Action>) {
    try {
      const { data } = await API.put(
        `/api/v1/rescue-posts/${postId}/comments`,
        { comment }
      );
      console.log("--add commment data", data);
      dispatch({
        type: ActionTypes.ADD_COMMENT_SUCCESS,
        payload: {
          postId,
          comment: data.data,
        },
      });
    } catch (error: any) {
      console.log("----error", error);
      dispatch({
        type: ActionTypes.ADD_COMMENT_FAILURE,
        payload: {
          error: error?.response?.data?.message ?? "something went wrong",
        },
      });
    }
  };
}

export { getAllRescuePosts, deleteComment, addComment , getSingleRescuePost};




