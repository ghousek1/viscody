import React, { useContext } from "react";
import { DataTypeContext } from "../context/DataTypeContext";
import { ThemeContext } from "../context/ThemeContext";

function DataTypeDropDown() {
  const [ ,changeDataType] = useContext(DataTypeContext);
  const [userThemeMode] = useContext(ThemeContext);

  const modifyDataType = (value) => {
    changeDataType(value);
  };

  return (
    <div className="">
      <select
      defaultValue="json"
        id="langTypes"
        className={`${userThemeMode === "dark" ? "bg-black text-white" : "text-black"} 
        text-s w-full
        font-uno text-[0.7rem] leading-[1.2rem] md:text-[0.9rem]
        border p-2`}
        
        onChange={(e) => modifyDataType(e.target.value)}
      >
        <option value="json"> json </option>
        <option value="yaml">yaml</option>
        <option value="xml">xml</option>
        <option value="csv">csv</option>
      </select>
    </div>
  );
}

export default DataTypeDropDown;
