import React from "react";
import moment from "moment";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";

function Submission({ submission }) {
  let color;
  let status;
  switch (submission.status) {
    case "Accepted":
      status = <IoMdCheckmarkCircleOutline />;
      color = "text-green-500";
      break;
    case "Wrong Answer":
      status = <AiOutlineCloseCircle />;
      color = "text-red-500";
      break;
    default:
      status = <AiOutlineInfoCircle />;
      color = "text-yellow-500";
  }

  return (
    <>
      <tr className="text-white">
        <td
          className={`px-4 py-3 font-semibold ${color}  text-sm flex items-center gap-2`}
        >
          {status}
          {submission.status}
        </td>
        <td className="px-4 py-3 text-ms font-semibold ">{submission.score}</td>
        <td className="px-4 py-3 text-xs ">{submission.language}</td>
        <td className="px-4 py-3 text-sm ">
          {moment(submission.submission_Date_Time).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}
        </td>
      </tr>
    </>
  );
}

export default Submission;
