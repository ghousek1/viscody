import React, { ReactElement } from "react";
// import { CsvToHtmlTable } from "react-csv-to-table";

interface ICsvVisualizerProps {
  codeText: string;
}

const CsvVisualizer = ({ codeText }: ICsvVisualizerProps): ReactElement => {
  return (
    <>
      {/* <CsvToHtmlTable
        data={codeText}
        csvDelimiter=","
        tableClassName="table table-striped table-hover"
      /> */}
    </>
  );
};

export default CsvVisualizer;
