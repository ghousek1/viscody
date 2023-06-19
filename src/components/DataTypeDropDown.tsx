import React, { useContext, ReactElement, ChangeEvent } from "react";
import {
  DataTypeContext,
  IDataTypeContextType,
} from "../context/DataTypeContext";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import { DataTypeValue } from "../util/DataTypeUtil";
import { Select } from "antd";

const DataTypeDropDown = (): ReactElement => {
  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);
  const userThemeModeContext = useContext<IThemeContextType>(ThemeContext);

  const handleChange = (value: string): void => {
    dataTypeContext.changeDataType(value as DataTypeValue);
  };

  return (
    <>
      <Select
        className="w-[6rem]"
        defaultValue="json"
        onChange={handleChange}
        options={[
          { value: "json", label: "json" },
          { value: "yaml", label: "yaml" },
          { value: "xml", label: "xml" },
          { value: "csv", label: "csv" },
        ]}
      />
    </>
  );
};
export default DataTypeDropDown;
