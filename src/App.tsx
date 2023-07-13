import "./App.css";
import ThemeContextDefaultProvider from "./context/ThemeContextProvider";
import DataTypeContextProvider from "./context/DataTypeContextProvider";
import Master from "./components/Master";

function App() {
  return (
    <div className="App">
        
      <ThemeContextDefaultProvider>
        <DataTypeContextProvider>
          <Master />
        </DataTypeContextProvider>
      </ThemeContextDefaultProvider>
       
    </div>
  );
}

export default App;
