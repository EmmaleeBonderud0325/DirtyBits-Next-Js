import React, { ReactElement } from "react";

interface Props {
  inputData: string;
  outputData: string;
}

function IoTable(props: Props): ReactElement {
  return (
    <div>
      <table className="border-collapse w-3/6">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-[#1F2937] text-white border border-white hidden lg:table-cell">
              Input
            </th>
            <th className="p-3 font-bold uppercase bg-[#1F2937] text-white border border-white hidden lg:table-cell">
              Output
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#1F2937] flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-white border border-white border-b block lg:table-cell relative lg:static">
              <pre>{props.inputData}</pre>
            </td>
            <td className="w-full lg:w-auto p-3 text-white border-white border border-b block lg:table-cell relative lg:static">
              <pre>{props.outputData}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default IoTable;
