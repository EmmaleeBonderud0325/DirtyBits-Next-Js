import { submitCode } from 'components/api/apis';
import Encodemail from 'components/Helper/Encodemail';
import { base64_encode } from 'components/ProblemPage/Helper2';
import Cookies from 'js-cookie';
import React from 'react'
import { submissionResultI } from 'redux/interfaces';

function useSubmitCode() {
    const handleSubmitCode = async (email, setIsSubmitDisabled, setIsModalVisible, problemPageProblemId, editorLanguage, editorValue, ) => {
        setIsSubmitDisabled(true);
        if (!Cookies.get("refresh")) {
          setIsModalVisible(true);
          setIsSubmitDisabled(false);
          console.error("Login Required !!");
          return;
        }
        const encoded_mail = Encodemail(email);
        var socket = new WebSocket(
          `ws://34.131.70.37:8001/ws/runcode/${encoded_mail}/`
        );
        // var socket = new WebSocket(
        //   `ws://localhost:8000/ws/runcode/${encoded_mail}/`
        // );
        socket.onopen = async function (e) {
          props.currentTabFunction(1);
          props.codeRunner(true);
          props.result({});
          console.log("opened");
          await submitCode.post("/", {
            problem_Id: problemPageProblemId,
            language: editorLanguage.label,
            code: base64_encode(editorValue),
          });
        };
        socket.onmessage = async function (e) {
          var data = JSON.parse(e.data);
          if (data["inc_submissions"]) {
            //Inc submission count
            console.log(true);
          }
          if (!data["is_testcase"]) {
            dispatch(changeSubmissionCount(submissionCount + 1));
            var problemResult: submissionResultI = JSON.parse(data["text"])[0][
              "fields"
            ];
            props.result(problemResult);
            var appendData: submissionsListI = {
              status: problemResult.status,
              score: problemResult.score,
              language: problemResult.language,
              submission_Date_Time: problemResult.submission_Date_Time,
              total_score: problemResult.total_score,
            };
            dispatch(changeGetSubmissionsListAppendData(appendData));
          } else {
            console.log(data["text"]);
          }
        };
        socket.onclose = function (e) {
          props.codeRunner(false);
          setIsSubmitDisabled(false);
          console.log("closed");
        };
      };
  return [handleSubmitCode];
}

export default useSubmitCode