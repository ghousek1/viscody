import "./App.css";
import HomeSection from "./components/HomeSection";
import NavBar from "./components/Navbar";
import ThemeContextDefaultProvider from "./context/ThemeContextProvider";
import DataTypeContextProvider from "./context/DataTypeContextProvider";
import { ConfigProvider } from "antd";
import { antDesignCustomTheme } from "./configs/AntThemeConfig";

function App() {
  return (
    <div className="App">
      <ThemeContextDefaultProvider>
        <DataTypeContextProvider>
          <ConfigProvider theme={antDesignCustomTheme}></ConfigProvider>
          <NavBar />
          <HomeSection />
          <ConfigProvider />
        </DataTypeContextProvider>
      </ThemeContextDefaultProvider>
    </div>
  );
}

export default App;
