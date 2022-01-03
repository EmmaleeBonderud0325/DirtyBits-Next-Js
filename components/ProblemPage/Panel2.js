import { useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import Editor from "./Editor";
import Tabs from "../Tabs";
import { connect } from "react-redux";

function Panel2(props) {
  const [userSubmissions, setUserSubmissions] = useState(0);
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
        // defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
        // onChange={(size) => localStorage.setItem('splitPos', size)}
      >
        <Pane className="scrollbar-hide" style={{ overflowY: "scroll" }}>
          <Tabs
            codeRunner={running}
            submissionData={resultData}
            currentTabValue={tabsValue}
            currentTabFunction={tabsValueHandler}
            userSubmissions={userSubmissions}
            setUserSubmissions={setUserSubmissions}
            submissionList={submissionList}
            setSubmissionList={setSubmissionList}
            getSubmissionsState={getSubmissionsState}
            setGetSubmissionsState={setGetSubmissionsState}
          />
        </Pane>
        <Pane className="scrollbar-hide" style={{ overflowY: "scroll" }}>
          <Editor
            codeRunner={runningHandler}
            result={submissionDataHandler}
            currentTabFunction={tabsValueHandler}
            userSubmissions={userSubmissions}
            setUserSubmissions={setUserSubmissions}
            submissionList={submissionList}
            setSubmissionList={setSubmissionList}
          />
        </Pane>
      </SplitPane>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userEmail: state.userData.email,
  };
};

export default connect(mapStateToProps, {})(Panel2);
