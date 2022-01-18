import TableLoader from "./TableLoader";
import { connect } from "react-redux";
import Link from "next/link";

function Table(props) {
  let problemLevel;
  let problemColor;
  let status;

  let problemMarkup = props.list.map((problem, idx) => {
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
        status = "✔️";
        break;
      case "Attempted":
        status = "❓";
        break;
    }
    return (
      <tr key={problem.id}>
        <td className="table-data text-white border-b border-slate-800">
          <Link href={`/problem/${problem.id}/${problem.title}`}>
            <a className="text-white hover:bg-blue-dark">
              {idx + 1} . {problem.title}
            </a>
          </Link>
        </td>
        <td className="py-4 px-6 border-b border-slate-800">
          <p
            className={` ${problemColor} font-bold py-1 px-3 rounded text-xs `}
          >
            {problemLevel}
          </p>
        </td>
        <td className="table-data cursor-default border-b border-slate-800">
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
          <tbody className="">{props.list.length > 0 && problemMarkup}</tbody>
        </table>
      </div>
      {props.list.length <= 0 && <TableLoader />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.problemList,
  };
};

export default connect(mapStateToProps)(Table);
