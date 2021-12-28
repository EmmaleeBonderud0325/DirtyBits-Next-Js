import { useEffect, useState } from "react";
import { getSubmissionsList } from "../../api/apis";
import Cookies from "js-cookie";

const Submission = () => {
  const [submissionList, setSubmissionList] = useState([]);
  useEffect(() => {
    //request
    async function getList() {
      const response = await getSubmissionsList.post(
        "/",
        {
          problem_id: 6,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${Cookies.get("access")}`,
          },
        }
      );
      console.log("response", response.data);
    }
    getList();
  });
  return <div>New submissions</div>;
};

export default Submission;
