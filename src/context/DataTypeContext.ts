import { createContext } from "react";
import { DataTypeValue } from "../util/DataTypeUtil";

export interface IDataTypeContextType {
  dataType: DataTypeValue;
  changeDataType(value: string): void;
}

export const defaultTypeContextType: IDataTypeContextType = {
  dataType: "json",
  changeDataType: () => {}
};

export const DataTypeContext = createContext<IDataTypeContextType>(defaultTypeContextType);
