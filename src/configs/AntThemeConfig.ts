import { ThemeConfig, theme } from "antd";

export const antDesignLightTheme:ThemeConfig = {
    
    algorithm: theme.defaultAlgorithm,

    token: { colorPrimary: "#DC143C" },

    components: {
      Radio: {
        colorPrimary: '#FFFF00'
      }
    }
  };


  export const antDesignDarkTheme:ThemeConfig = {
    
    algorithm: theme.darkAlgorithm,

    token: { colorPrimary: "#DC143C" },

    components: {
      Radio: {
        colorPrimary: '#FFFF00'
      }
    }
  };