import { useState, useEffect } from "react";
import "../App.css";
import { ThemeContext } from "./ThemeContext";
import { useCookieValue } from "@react-hookz/web/esm/useCookieValue";
import {ThemeMode} from "../util/ThemeUtil";

const ThemeContextDefaultProvider = (props: any) => {
  const [userThemeMode, setUserThemeMode] = useState<ThemeMode>("light");
  const [themeCookie, setThemeCookie, ] = useCookieValue(
    "viscodyThemeCookie",
    { expires: 2592000 }
  );

  useEffect(() => {
    let userColorScheme: ThemeMode = "light";

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        userColorScheme = event.matches ? "dark" : "light";
      });
    
     const colorScheme: ThemeMode = (themeCookie === "dark" || themeCookie === "light") 
                        ?  themeCookie : userColorScheme;
                        
    setThemeCookie(colorScheme);
    setUserThemeMode(userColorScheme);
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
    let toggledThemeMode: ThemeMode = userThemeMode === "dark" ? "light" : "dark";
    setUserThemeMode(toggledThemeMode);
    setThemeCookie(toggledThemeMode);
  };

  const toggleCSSVariables = () => {
    const themeCSSVariables =
      userThemeMode === "light"
        ? lightThemeCSSVariables
        : darkThemeCSSVariables;
        
    themeCSSVariables.forEach((cssVar) => {
      document.documentElement.style.setProperty(cssVar.name, cssVar.value);
    });
  };

  return (
    <>
      <ThemeContext.Provider value={{
      themeMode:userThemeMode,
      toggleThemeMode: toggleUserThemeMode,
      }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  );
}

export default ThemeContextDefaultProvider;
