import { ThemeConfig, theme } from "antd";

export const antDesignCustomTheme:ThemeConfig = {
    
    algorithm: theme.darkAlgorithm,

    token: { colorPrimary: "#DC143C" },

    components: {
      Radio: {
        colorPrimary: '#FFFF00'
      }
    }
  };