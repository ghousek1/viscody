import React from "react";
import { CsvToHtmlTable } from "react-csv-to-table";

function CsvVisualizer({ codeText }) {
  return (
    <>
       <CsvToHtmlTable
        data={codeText}
        csvDelimiter=","
        tableClassName="table table-striped table-hover"
      />
    </>
  );
}

export default CsvVisualizer;
