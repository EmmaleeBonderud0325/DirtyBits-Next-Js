import { useEffect } from "react";
import { getSubmissionsList } from "../../api/apis";
import moment from "moment";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { Spin } from "antd";

const Submission = (props) => {
  useEffect(() => {
    console.log("useeffect submissions");
    async function getList() {
      try {
        const response = await getSubmissionsList.get(`/${props.probId}/`);
        props.setSubmissionList(response.data);
      } catch (e) {
        console.error("Token Error");
      }
    }
    if (props.getSubmissionsState) {
      getList();
      props.setGetSubmissionsState(false);
    }
  }, []);
  const listRowHandler = () => {
    let rowMarkup = props.submissionList.map((submission) => {
      let status;
      let color;
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
        <tr class="text-white">
          <td
            class={`px-4 py-3 ont-semibold ${color} text-sm flex items-center gap-2`}
          >
            {status}
            {submission.status}
          </td>
          <td class="px-4 py-3 text-ms font-semibold ">{submission.score}</td>
          <td class="px-4 py-3 text-xs ">{submission.language}</td>
          <td class="px-4 py-3 text-sm ">
            {moment(submission.submission_Date_Time).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </td>
        </tr>
      );
    });

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
            <tbody class="bg-slate-800">
              {props.submissionList !== null && listRowHandler()}
            </tbody>
          </table>
          {props.submissionList === null && (
            <div className="text-center w-full">
              <p className="text-white font-bold text-2xl p-4">
                <Spin size="large" tip="Loading..."></Spin>
              </p>
            </div>
          )}
          {props.submissionList !== null && props.submissionList.length <= 0 && (
            <div className="text-center w-full">
              <p className="text-white p-4 font-bold text-2xl">
                No Submissions
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Submission;
