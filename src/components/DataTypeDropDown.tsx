import { Select } from "antd";
import { ReactElement, useContext } from "react";
import {
  DataTypeContext,
  IDataTypeContextType,
} from "../context/DataTypeContext";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import { DataTypeValue } from "../util/DataTypeUtil";

const DataTypeDropDown = ({styleClassName}:any): ReactElement => {
  const dataTypeContext = useContext<IDataTypeContextType>(DataTypeContext);
  const userThemeModeContext = useContext<IThemeContextType>(ThemeContext);

  const handleChange = (value: string): void => {
    dataTypeContext.changeDataType(value as DataTypeValue);
  };

  return (
    <>
      <Select
        className={styleClassName}
        defaultValue="json"
        onChange={handleChange}
        options={[
          { value: "json", label: "json" },
          { value: "yaml", label: "yaml" },
          { value: "toml", label: "toml" },
          { value: "xml", label: "xml" },
          { value: "csv", label: "csv" },
        ]}
      />
    </>
  );
};
export default DataTypeDropDown;
