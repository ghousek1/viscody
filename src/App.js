import "./App.css";
import HomeSection from "./components/HomeSection";
import NavBar from "./components/Navbar";
import ThemeContextDefaultProvider from "./context/ThemeContextProvider";
import DataTypeContextProvider from "./context/DataTypeContextProvider";

function App() {
  return (
    <div className="App">
      <ThemeContextDefaultProvider>
        <DataTypeContextProvider>
          <NavBar />
          <HomeSection />
        </DataTypeContextProvider>
      </ThemeContextDefaultProvider>
    </div>
  );
}

export default App;
