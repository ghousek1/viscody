import React, { useContext, useState } from "react";
import { DataTypeContext } from "../context/DataTypeContext";
import { ThemeContext } from "../context/ThemeContext";

function DataTypeDropDown() {
  const [dataType, changeDataType] = useContext(DataTypeContext);
  const [userThemeMode, toggleUserThemeMode] = useContext(ThemeContext);

  const modifyDataType = (value) => {
    changeDataType(value);
  };

  return (
    <div className="">
      <select
      defaultValue="json"
        id="langTypes"
        className={`${userThemeMode === "dark" ? "bg-black text-white" : "text-black"} 
        text-s w-full rounded-lg 
        font-monospace text-[0.7rem] leading-[1.2rem] md:text-[0.9rem] md:leading-[1.5rem]
        border p-2.5`}
        
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
