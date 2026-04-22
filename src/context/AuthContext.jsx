import { createContext, useContext, useReducer, useEffect } from "react";

// ── Reducer ────────────────────────────────────────────────
const initialState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false, error: null };
    case "LOGOUT":
      return { ...state, user: null, token: null, loading: false, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────
const AuthContext = createContext(null);

const API = "/api/auth";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("rl_token");
    const user = localStorage.getItem("rl_user");
    if (token && user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, user: JSON.parse(user) } });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const register = async (name, email, password, role) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });
    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("rl_token", data.token);
      localStorage.setItem("rl_user", JSON.stringify(data.user));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      return data;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  };

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("rl_token", data.token);
      localStorage.setItem("rl_user", JSON.stringify(data.user));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      return data;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("rl_token");
    localStorage.removeItem("rl_user");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
