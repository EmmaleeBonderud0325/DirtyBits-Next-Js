import React, { ReactElement } from "react";

interface Props {
  inputData: string;
  outputData: string;
}

function IoTable(props: Props): ReactElement {

  const tableBorder = {
    border: "1px solid #000",
  }
  return (
    <>
      <table className="border-collapse w-3/6 mb-6">
        <thead>
          <tr>
            <th style={tableBorder} className="p-3 font-bold uppercase bg-[#1F2937] text-white hidden lg:table-cell">
              Input
            </th>
            <th style={tableBorder} className="p-3 font-bold uppercase bg-[#1F2937] text-white hidden lg:table-cell">
              Output
            </th>
          </tr>
        </thead>
        <tbody style={tableBorder}>
          <tr className="bg-[#1F2937] flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td style={tableBorder} className="w-full lg:w-auto p-3 text-white block lg:table-cell relative lg:static">
              <pre>{props.inputData}</pre>
            </td>
            <td className="w-full lg:w-auto p-3 text-white block lg:table-cell relative lg:static">
              <pre>{props.outputData}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default IoTable;
