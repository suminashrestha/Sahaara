import { createContext, useContext, useReducer } from "react";
import API from "../config/baseUrl";

import { ActionTypes } from "../constants/action_types";

interface User {
  email: string;
  type: string;
  username: string;
  _id: string;
}

const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
  login: (arg1: string, arg2: string) => Promise<void>;
  logout: () => Promise<void>;
  dispatch: React.Dispatch<any>;
}>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  dispatch: () => {},
  isLoading: false,
  error: null,
});

const initialState = {
  user: JSON.parse(localStorage.getItem("userInfo") || "null"),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

function reducer(state: any, action: any) {
  switch (action.type) {
    // case ActionTypes.LOGIN_REQUEST:
    //   localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    //   localStorage.setItem("token", action.payload.token);
    //   return {
    //     ...state,
    //     user: action.payload.user,
    //     token: action.payload.token,
    //     isAuthenticated: true,
    //   };

    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case ActionTypes.LOGOUT:
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("unknown action");
  }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, token, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(identifier: string, password: string) {
    try {
      // dispatch({
      //   type: ActionTypes.LOGIN_REQUEST,
      // });

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
        },
      });
    }
  }

  async function logout() {
    const { data } = await API.post("/api/v1/user/logout");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        dispatch,
        logout,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
