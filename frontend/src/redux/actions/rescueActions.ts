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

export { getAllRescuePosts };
