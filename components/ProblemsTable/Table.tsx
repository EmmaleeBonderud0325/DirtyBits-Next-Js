import { ReactElement, useState } from "react";
import Link from "next/link";

import TableLoader from "../TableSkeleton/TableLoader";
// import { Paginator } from "primereact/paginator";
import { problemListI } from "redux/interfaces";
import {DashIcon, QuestionIcon, CheckIcon} from 'SVG'
import { Pagination } from '@mantine/core';

interface Props {
  dataList: problemListI[];
}

function Table(props: Props): ReactElement {
  const [basicFirst, setBasicFirst] = useState<number>(0);
  const [basicRows, setBasicRows] = useState<number>(10);

  // const onBasicPageChange = (event: any) => {
  //   setBasicFirst(event.first);
  //   setBasicRows(event.rows);
  //   console.log("request for", event.page + 1);
  // };

  let problemLevel: string;
  let problemColor: string;
  let status: JSX.Element;

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
        status = <DashIcon/>;
        break;
      case "Solved":
        status = <CheckIcon/>;
        break;
      case "Attempted":
        status = <QuestionIcon/>;
        break;
    }
    return (
      <tr key={problem.id}>
        <td className="table-data text-white border-b border-slate-800">
          <Link href={`/problem/${problem.id}/${problem.title}`}>
          <a
            
            className="text-stone-200 hover:text-indigo-400 transition-all duration-200 ease-in md:text-sm"
            >
            {idx + 1} . {problem.title}
          </a>
            </Link>
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

      <div className="hidden md:flex">
        <Pagination page={1} onChange={() => {}} total={10} />
      </div>
    </div>
  );
}
export default Table;
