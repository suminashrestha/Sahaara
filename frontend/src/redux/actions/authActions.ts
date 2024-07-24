import API from "../../config/baseUrl";
import { Dispatch } from "redux";
import { ActionTypes } from "../../constants/action_types";
import { Action, Actiontype } from "../../constants/common_types";

function login(identifier: string, password: string): Actiontype {
  return async function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionTypes.LOGIN_REQUEST,
    });
    try {
      const { data } = await API.post("/api/v1/user/sign-in", {
        identifier,
        password,
      });
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: { user: data.data.user, token: data.data.accessToken },
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        payload: {
          error: error.response.data.message,
          success: error.response.data.success,
        },
      });
    }
  };
}

const logout = (): Actiontype => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.LOGOUT_REQUEST,
  });
  try {
    const { data } = await API.post("/api/v1/user/logout");

    console.log("data inside action logoout", data);
    dispatch({
      type: ActionTypes.LOGOUT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypes.LOGOUT_FAILURE,
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

export const toggleVolunteerMode = (isVolunteer: boolean) => ({
  type: ActionTypes.TOGGLE_VOLUNTEER_MODE,
  payload: isVolunteer,
});

export { logout, login };