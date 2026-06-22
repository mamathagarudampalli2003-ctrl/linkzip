import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  // SAFE USER PARSE
  const [user, setUser] = useState(() => {
    const storedUser =
      localStorage.getItem("user");

    if (
      !storedUser ||
      storedUser === "undefined"
    ) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      return null;
    }
  });

  // SAFE TOKEN
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // LOGIN FUNCTION
  const login = (userData, jwtToken) => {

    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      jwtToken
    );
  };

  // LOGOUT FUNCTION
  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // AUTO LOGOUT IF TOKEN REMOVED
  useEffect(() => {

    if (!token) {
      localStorage.removeItem("user");
    }

  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }} 
    > 
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
export const useAuth = () => {
  return useContext(AuthContext);
};