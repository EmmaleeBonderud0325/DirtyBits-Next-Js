import React from 'react'

function Table() {
    return (
        <div class="lg:w-2/3 w-1/5">
  <div class="bg-[#060F1E] shadow-md rounded my-6">
    <table class="text-left w-full border-collapse">
      <thead>
        <tr>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-base text-[#686868] border-b border-grey-light">Problem title</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-base text-[#686868] text-grey-dark border-b border-grey-light">Difficulty</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-base text-[#686868] text-grey-dark border-b border-grey-light">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-grey-lighter">
          <td class="py-4 px-6 border-b border-grey-light font-medium hover:text-blue-700 transition-all ease-in-out duration-100 cursor-pointer">1. Two Sum</td>
          <td class="py-4 px-6 border-b border-grey-light">
            <a href="#" class="text-green-500 font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">Easy</a>
          </td>
          <td class="py-4 px-6 border-b border-grey-light font-medium hover:text-blue-700 transition-all ease-in-out duration-100 cursor-pointer">➖</td>
        </tr>
        <tr class="hover:bg-grey-lighter">
          <td class="py-4 px-6 border-b border-grey-light font-medium hover:text-blue-700 transition-all ease-in-out duration-100 cursor-pointer">2. Add Two Numbers</td>
          <td class="py-4 px-6 border-b border-grey-light">
            <a href="#" class="text-yellow-400 font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">Medium</a>
          </td>
          <td class="py-4 px-6 border-b border-grey-light font-medium hover:text-blue-700 transition-all ease-in-out duration-100 cursor-pointer">✔️</td>
        </tr>
        <tr class="hover:bg-grey-lighter">
          <td class="py-4 px-6 border-b border-grey-light font-medium hover:text-blue-700 transition-all ease-in-out duration-100 cursor-pointer">3. Median of Two Sorted Arrays</td>
          <td class="py-4 px-6 border-b border-grey-light">
            <a href="#" class="text-red-600 font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">Hard</a>
          </td>
          <td class="py-4 px-6 border-b border-grey-light font-medium hover:text-blue-700 transition-all ease-in-out duration-100 cursor-pointer">✔️</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    )
}

export default Table
