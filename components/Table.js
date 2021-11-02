import React from 'react'

function Table({list}) {
    let problemLevel;
    let problemColor;
    let status;
    let problemMarkup = (
      list.map((problem, idx) => {
        switch(problem.problem_level){
            case 'E':
              problemLevel = 'Easy'
              problemColor = 'text-green-500'
              break;
            case 'M':
              problemLevel = 'Medium'
              problemColor = 'text-yellow-500'
              break;
            case 'H':
              problemLevel = 'Hard'
              problemColor = 'text-red-500'
              break;
        }
        switch(problem.solved){
          case 'Unsolved':
              status = '➖'
              break;
          case 'Solved':
              status = '✔️'
              break;
          case 'Attempted':
              status = '❓'
              break;
        } 
        return (
          <tr key={problem.id} className="hover:bg-grey-lighter">
          <td className="table-data">{idx+1} . {problem.title}</td>
          <td className="py-4 px-6 border-b border-grey-light">
            <a href="#" className={` ${problemColor} font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark`}>{problemLevel}</a>
          </td>
          <td className="table-data">{status}</td>
        </tr>
        )
      })
    )
    
    return (
        <div className="lg:w-2/3 md:w-full sm:w-full xs:w-full">
  <div className="bg-[#060F1E] shadow-md rounded my-6">
    <table className="text-left w-full border-collapse">
      <thead>
        <tr>
          <th className="table-heading">Problem title</th>
          <th className="table-heading">Difficulty</th>
          <th className="table-heading">Status</th>
        </tr>
      </thead>
      <tbody>
        {problemMarkup}     
      </tbody>
    </table>
  </div>
</div>
    )
}

export default Table
