import { React, useState, useEffect } from "react";
import "../App.css";
import { ThemeContext } from "./ThemeContext";

function ThemeContextDefaultProvider(props) {
  const [userThemeMode, setUserThemeMode] = useState("light");

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        setUserThemeMode(colorScheme);
      });

    toggleUserThemeMode();
    toggleCSSVariables();
  }, []);

  const lightThemeCSSVariables = [
    {
      name: "--custom-background-color",
      value: "#fdfdfd",
    },
    {
      name: "--custom-font-color",
      value: "#090909",
    },
  ];

  const darkThemeCSSVariables = [
    {
      name: "--custom-background-color",
      value: "#090909",
    },
    {
      name: "--custom-font-color",
      value: "#fdfdfd",
    },
  ];

  const toggleUserThemeMode = () => {
    setUserThemeMode(userThemeMode === "dark" ? "light" : "dark");
    toggleCSSVariables();
  };

  const toggleCSSVariables = () => {
    const themeCSSVariables =
      userThemeMode === "light"
        ? lightThemeCSSVariables
        : darkThemeCSSVariables;
    themeCSSVariables.map((cssVar) => {
      document.documentElement.style.setProperty(cssVar.name, cssVar.value);
    });
  };

  return (
    <>
      <ThemeContext.Provider value={[userThemeMode, toggleUserThemeMode]}>
        {props.children}
      </ThemeContext.Provider>
    </>
  );
}

export default ThemeContextDefaultProvider;
