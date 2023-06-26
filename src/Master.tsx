
import React, { useState, useContext, useEffect } from "react";
import HomeSection from "./components/HomeSection";
import NavBar from "./components/Navbar";

import { ConfigProvider } from "antd";
import { antDesignLightTheme,antDesignDarkTheme } from "./configs/AntThemeConfig";
import { IThemeContextType, ThemeContext } from "./context/ThemeContext";
import { ThemeConfig } from "antd";

function Master() {

    
  const userThemeModeContext = useContext<IThemeContextType>(ThemeContext);
  const [antDesignCustomTheme,setAntDesignCustomTheme] = useState<ThemeConfig>(antDesignLightTheme);

  useEffect(()=>{
    console.log("theme context changed");
    const theme = userThemeModeContext.themeMode === "dark" ? antDesignDarkTheme : antDesignLightTheme;
    setAntDesignCustomTheme(theme);
    console.log("theme changed",theme);
  },[userThemeModeContext]);



  return (
    <>
      <ConfigProvider theme={antDesignCustomTheme}>
        <NavBar />
        <HomeSection />
      </ConfigProvider>
    </>
  );
}

export default Master;
