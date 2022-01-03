import { useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import Editor from "./Editor";
import Tabs from "../Tabs";
import { useSelector } from "react-redux";

function Panel2() {
  const isRendered = useSelector((state) =>
    state.problemData.title !== "" ? true : false
  );
  const [submissionList, setSubmissionList] = useState(null);
  const [getSubmissionsState, setGetSubmissionsState] = useState(true);
  const [tabsValue, setTabsValue] = useState(0);
  const [resultData, setResultData] = useState({});
  const [running, setIsRunning] = useState(false);
  const tabsValueHandler = (value) => {
    setTabsValue(value);
  };

  const submissionDataHandler = (value) => {
    setResultData(value);
  };

  const runningHandler = (value) => {
    setIsRunning(value);
  };

  console.log("result data", resultData);
  return (
    <div>
      <SplitPane
        split="vertical"
        minSize={300}
        maxSize={1200}
        defaultSize={900}
        style={{ height: "100vh" }}
        className="scrollbar-hide"
      >
        <Pane className="scrollbar-hide" style={{ overflowY: "scroll" }}>
          {isRendered && (
            <Tabs
              codeRunner={running}
              submissionData={resultData}
              currentTabValue={tabsValue}
              currentTabFunction={tabsValueHandler}
              submissionList={submissionList}
              setSubmissionList={setSubmissionList}
              getSubmissionsState={getSubmissionsState}
              setGetSubmissionsState={setGetSubmissionsState}
            />
          )}
        </Pane>
        <Pane className="scrollbar-hide" style={{ overflowY: "scroll" }}>
          <Editor
            codeRunner={runningHandler}
            result={submissionDataHandler}
            currentTabFunction={tabsValueHandler}
            submissionList={submissionList}
            setSubmissionList={setSubmissionList}
          />
        </Pane>
      </SplitPane>
    </div>
  );
}

export default Panel2;
