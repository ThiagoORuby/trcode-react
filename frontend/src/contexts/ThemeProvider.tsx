import React, { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

const initialState: ThemeState = {
  theme: "dark",
  toggleTheme: () => null,
};

export const ThemeContext = createContext<ThemeState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("trcode-theme") as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log("mudou");
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
    localStorage.setItem("trcode-theme", theme);
  };

  return (
    <ThemeContext.Provider {...props} value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
