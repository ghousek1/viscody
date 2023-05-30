import "./App.css";
import HomeSection from "./components/HomeSection";
import NavBar from "./components/Navbar";
import ThemeContextDefaultProvider from "./context/ThemeContextProvider";
import DataTypeContextProvider from "./context/DataTypeContextProvider";
import HomeSection2 from "./components/HomeSection2";

function App() {
  return (
    <div className="App">
      <ThemeContextDefaultProvider>
        <DataTypeContextProvider>
          <NavBar />
          {/* <HomeSection /> */}
          <HomeSection2/>
        </DataTypeContextProvider>
      </ThemeContextDefaultProvider>
    </div>
  );
}

export default App;
