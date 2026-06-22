import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({
  children,
}) => {
  const [theme, setTheme] =
    useState("dark");

  // ================= LOAD THEME =================

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // ================= APPLY THEME =================

  useEffect(() => {
    document.documentElement.className =
      theme;

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  // ================= TOGGLE =================

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ================= CUSTOM HOOK =================

export const useTheme = () => {
  return useContext(ThemeContext);
};