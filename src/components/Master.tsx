
import { useContext, useEffect, useState } from "react";
import HomeSection from "./HomeSection";
import NavBar from "./Navbar";

import { ConfigProvider, ThemeConfig } from "antd";
import { antDesignDarkTheme, antDesignLightTheme } from "../configs/AntThemeConfig";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";

function Master() {

    
  const userThemeModeContext = useContext<IThemeContextType>(ThemeContext);
  const [antDesignCustomTheme,setAntDesignCustomTheme] = useState<ThemeConfig>(antDesignLightTheme);
  const [visualizerRef,setVisualizerRef] = useState<any|null>(null);

  useEffect(()=>{
    const theme = userThemeModeContext.themeMode === "dark" ? antDesignDarkTheme : antDesignLightTheme;
    setAntDesignCustomTheme(theme);
  },[userThemeModeContext]);

  const changeZoomIn = (): void=>{
    if(visualizerRef){
      visualizerRef.current?.zoomIn();
    }
  }
  
  const changeZoomOut = (): void=>{
    if(visualizerRef){
      visualizerRef.current?.zoomOut();
    }
  }
  
  const changeExpand = (): void=>{
    if(visualizerRef){
      visualizerRef.current?.fitCanvas();
    }
  }

  const getVisualizerRef = (data:any) => {
    if(data){
      setVisualizerRef(data);
    }
  }



  return (
    <>
      <ConfigProvider theme={antDesignCustomTheme}>
        <NavBar changeZoomIn={changeZoomIn} changeZoomOut={changeZoomOut} changeExpand={changeExpand} />
        <HomeSection  getVisualizerRef={getVisualizerRef} />
      </ConfigProvider> 
    </>
  );
}

export default Master;
