import React from 'react'

function IoTable({inputData, outputData}) {
    return (
        <div>
        <table class="border-collapse w-3/6">
          <thead>
              <tr>
                  <th class="p-3 font-bold uppercase bg-[#1F2937] text-white border border-white hidden lg:table-cell">Input</th>
                  <th class="p-3 font-bold uppercase bg-[#1F2937] text-white border border-white hidden lg:table-cell">Output</th>
              </tr>
          </thead>
          <tbody>
              <tr class="bg-[#1F2937] flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td class="w-full lg:w-auto p-3 text-white border border-white border-b block lg:table-cell relative lg:static">                
                      <pre>{inputData}</pre>
                  </td>
                  <td class="w-full lg:w-auto p-3 text-white text-center border-white border border-b block lg:table-cell relative lg:static">
                      <pre>{outputData}</pre>
                      {/* <pre>output</pre> */}
                  </td>
              </tr>
          </tbody>
      </table>
   </div>
    )
}

export default IoTable
