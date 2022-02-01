import TableLoader from "./TableLoader";
import { connect } from "react-redux";
import Link from "next/link";

function Table(props) {
  let problemLevel;
  let problemColor;
  let status;

  let problemMarkup = props.dataList.map((problem, idx) => {
    switch (problem.problem_level) {
      case "E":
        problemLevel = "Easy";
        problemColor = "text-green-500";
        break;
      case "M":
        problemLevel = "Medium";
        problemColor = "text-yellow-500";
        break;
      case "H":
        problemLevel = "Hard";
        problemColor = "text-red-500";
        break;
    }
    switch (problem.solved) {
      case "Unsolved":
        status = "➖";
        break;
      case "Solved":
        status = "✅";
        break;
      case "Attempted":
        status = "❓";
        break;
    }
    return (
      <tr key={problem.id}>
        <td className="table-data text-white border-b border-slate-800">
          <a
            href={`/problem/${problem.id}/${problem.title}`}
            className="text-stone-200 hover:text-indigo-400 transition-all duration-200 ease-in text-sm"
          >
            {idx + 1} . {problem.title}
          </a>
        </td>
        <td className="py-4 px-6 border-b border-slate-800">
          <p
            className={` ${problemColor} font-light py-1 px-3 font-lato tracking-wider rounded text-xs `}
          >
            {problemLevel}
          </p>
        </td>
        <td className="table-data cursor-default border-b border-slate-800 text-lg">
          {status}
        </td>
      </tr>
    );
  });

  return (
    <div className="lg:w-2/3 md:w-full sm:w-full xs:w-full">
      <div className="bg-slate-800 shadow-md rounded-md my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="table-heading">Problem title</th>
              <th className="table-heading">Difficulty</th>
              <th className="table-heading">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {props.dataList.length > 0 && problemMarkup}
          </tbody>
        </table>
      </div>
      {props.dataList.length <= 0 && <TableLoader />}
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     dataList: state.problemList,
//   };
// };

// export default connect(mapStateToProps)(Table);
export default Table;
