import React, { useContext,ChangeEvent } from "react";
import { DataTypeContext, IDataTypeContextType } from "../context/DataTypeContext";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import { DataTypeValue } from "../util/DataTypeUtil";

function DataTypeDropDown() {
  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);
  const userThemeModeContext = useContext<IThemeContextType>(ThemeContext);

  const modifyDataType = (value: string): void => {
    dataTypeContext.changeDataType(value as DataTypeValue);
  };

  return (
    <div className="">
      <select
      defaultValue="json"
        id="langTypes"
        className={`${userThemeModeContext.themeMode === "dark" ? "bg-black text-white" : "text-black"} 
        text-s w-full
        font-uno text-[0.7rem] leading-[1.2rem] md:text-[0.9rem]
        border p-2`}
        
        onChange={(e: ChangeEvent<HTMLSelectElement>) => modifyDataType(e.target.value)}
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
