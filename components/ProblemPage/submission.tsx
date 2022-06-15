import { ReactElement } from "react";
import moment from "moment";
import { submissionsListI } from "../../redux/interfaces";
import RecentSubmission from '../Submission'
import { Loader } from "@mantine/core";
import useGetSubmissions from 'hooks/useGetSubmissions'

interface Props {
  submissionList: submissionsListI[];
  isRunning: boolean;
  result: submissionsListI;
  pId: number;
}

const Submission = (props: Props): ReactElement => {
  const [data, isLoading, error, isFetching] = useGetSubmissions(props.pId)

  if(data){
    console.log('sublist', data)
  }
  
  
  // if (Object.keys(props.result).length > 0) {
  //   var statusColor;
  //   switch (props.result.status) {
  //     case "Accepted":
  //       statusColor = "text-green-500";
  //       break;
  //     case "Wrong Answer":
  //       statusColor = "text-red-500";
  //       break;
  //   }
  // }
  return (
    <section className="container mx-auto p-6 font-mono scrollbar-hide">
      {/* {props.isRunning && (
        <div className="pl-5 h-36">
          <Loader className="w-full md:h-6 lg:h-10 xl:h-16 mt-10 flex justify-center items-center" color="violet" variant="bars" />
        </div>
      )}
      {Object.keys(props.result).length > 0 && (
        <div className="w-full pl-4 mb-5 leading-7">
          <div className="flex items-center gap-10">
            <p className={`${statusColor} text-2xl tracking-wider`}>
              {props.result.status}
            </p>
            <p>Details:</p>
          </div>
          <p>
            Score: <span className="font-semibold">{props.result.score}</span>
          </p>
          <p>
            Runtime: <span className="font-semibold">0 ms</span>
          </p>
          <p>
            Memory Usage: <span className="font-semibold">7 MB</span>
          </p>
          <p>
            Language:{" "}
            <span className="font-semibold">{props.result.language}</span>
          </p>
          <p>
            Submission Time:{" "}
            <span className="font-semibold">
              {moment(props.result.submission_Date_Time).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </span>
          </p>
        </div>
      )} */}
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg scrollbar-hide">
        <div className="w-full overflow-x-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-500 bg-slate-800 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800">
              {data?.length >= 0 && (
                data.map(submission => (
                  <RecentSubmission key={submission.submission_Date_Time} submission={submission}/>
                ))
              )}
            </tbody>
          </table>
          {isFetching && (
            <div className="text-center w-full">
              <p className="text-white font-bold text-2xl p-4">
                Loading...
              </p>
            </div>
          )}
          {data !== null && data?.length <= 0 && (
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
