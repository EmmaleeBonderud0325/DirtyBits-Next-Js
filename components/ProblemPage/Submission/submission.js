import { useEffect, useState } from "react";
import { getSubmissionsList } from "../../api/apis";
import Cookies from "js-cookie";

const Submission = () => {
  const [submissionList, setSubmissionList] = useState([]);
  useEffect(() => {
    //request
    async function getList() {
      try {
        const response = await getSubmissionsList.post("/", {
          problem_id: 6,
        });
        console.log("response", response.data);
      } catch (e) {
        console.error("Token Error");
      }
    }
    getList();
  });
  return <div>New submissions</div>;
};

export default Submission;
