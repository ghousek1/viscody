import { React, useState, useEffect } from "react";
import "../App.css";
import { ThemeContext } from "./ThemeContext";
import { useCookieValue } from "@react-hookz/web/esm/useCookieValue";

function ThemeContextDefaultProvider(props) {
  const [userThemeMode, setUserThemeMode] = useState("light");
  const [themeCookie, setThemeCookie, ] = useCookieValue(
    "viscodyThemeCookie",
    { expires: 2592000 }
  );

  useEffect(() => {
    let userColorScheme = "light";
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        userColorScheme = event.matches ? "dark" : "light";
      });
    

    const colorScheme = (themeCookie === "dark" || themeCookie === "light") 
                        ?  themeCookie : userColorScheme;
                        
    setThemeCookie(colorScheme);
    setUserThemeMode(colorScheme);
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
    let toggledThemeMode = userThemeMode === "dark" ? "light" : "dark";
    setUserThemeMode(toggledThemeMode);
    setThemeCookie(toggledThemeMode);
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
