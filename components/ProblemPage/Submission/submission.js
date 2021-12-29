import { useEffect, useState } from "react";
import { getSubmissionsList } from "../../api/apis";
import Cookies from "js-cookie";
import moment from "moment";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Submission = () => {
  const [submissionList, setSubmissionList] = useState([]);
  useEffect(() => {
    console.log("useeffect submissions");
    async function getList() {
      try {
        const response = await getSubmissionsList.post("/", {
          problem_id: 6,
        });
        setSubmissionList(response.data);
      } catch (e) {
        console.error("Token Error");
      }
    }
    getList();
  }, []);
  const listRowHandler = () => {
    if (submissionList.length <= 0) {
      return (
        <div className="text-center">
          <p className="text-white font-bold text-2xl">Loading...</p>
        </div>
      );
    }
    let rowMarkup = submissionList.map((submission) => (
      <tr class="text-white">
        <td class="px-4 py-3 ont-semibold text-green-500 text-sm flex items-center gap-2">
          <IoMdCheckmarkCircleOutline /> {submission.status}
        </td>
        <td class="px-4 py-3 text-ms font-semibold ">{submission.score}</td>
        <td class="px-4 py-3 text-xs ">{submission.language}</td>
        <td class="px-4 py-3 text-sm ">
          {moment(submission.submission_Date_Time).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}
        </td>
      </tr>
    ));

    return rowMarkup;
  };
  return (
    <section class="container mx-auto p-6 font-mono scrollbar-hide">
      <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg scrollbar-hide">
        <div class="w-full overflow-x-hidden">
          <table class="w-full">
            <thead>
              <tr class="text-md font-semibold tracking-wide text-left text-gray-500 bg-slate-800 uppercase border-b border-gray-600">
                <th class="px-4 py-3">Result</th>
                <th class="px-4 py-3">Score</th>
                <th class="px-4 py-3">Language</th>
                <th class="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody class="bg-slate-800">{listRowHandler()}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Submission;
