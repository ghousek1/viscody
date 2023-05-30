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
  }, []);

  useEffect(() => {
    toggleCSSVariables();
  }, [userThemeMode]);


  const lightThemeCSSVariables = [
    {
      name: "--custom-background-color",
      value: "#fcfcfc",
    },
    {
      name: "--custom-font-color",
      value: "#141414",
    },
  ];

  const darkThemeCSSVariables = [
    {
      name: "--custom-background-color",
      value: "#141414",
    },
    {
      name: "--custom-font-color",
      value: "#fcfcfc",
    },
  ];

  const toggleUserThemeMode = () => {
    setUserThemeMode(userThemeMode === "dark" ? "light" : "dark");
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
