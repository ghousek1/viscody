import "./App.css";
import HomeSection from "./components/HomeSection";
import NavBar from "./components/Navbar";
import ThemeContextDefaultProvider from "./context/ThemeContextProvider";

function App() {
  return (
    <div className="App">
      <ThemeContextDefaultProvider>
        <NavBar/>
        <HomeSection/>
      </ThemeContextDefaultProvider>
    </div>
  );
}

export default App;
