import { createContext, useContext, useReducer } from "react";
import API from "../../config/baseUrl";

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
  login: (arg1: string, arg2: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "logout":
        console.log("shirshak gandu")
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
    const { data } = await API.post("/api/v1/user/sign-in", {
      identifier,
      password,
    });

    dispatch({
      type: "login",
      payload: { user: data.data.user, token: data.data.accessToken },
    });
  }

  async function logout() {
    const { data } = await API.post("/api/v1/user/logout");
    if (!data.success) return;
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
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
