import { useState, useEffect } from "react";
import SplitPane, { Pane } from "react-split-pane";
import { useDispatch, connect } from "react-redux";
import { Spin } from "antd";

import Editor from "./Editor";
import Tabs from "../Tabs";
import {
  changeSubmissionsList,
  changeGetSubmissionsList,
} from "../../redux/actions/ProblemPage";

function Panel2(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(changeGetSubmissionsList(true));
      dispatch(changeSubmissionsList(null));
    };
  }, []);

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

  const backgroundColor = "#060F1E";

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
        <Pane
          className="scrollbar-hide"
          style={{ overflowY: "scroll", background: backgroundColor }}
        >
          {props.isRendered ? (
            <Tabs
              codeRunner={running}
              submissionData={resultData}
              currentTabValue={tabsValue}
              currentTabFunction={tabsValueHandler}
            />
          ) : (
            <div className="h-[100vh] flex justify-center items-center w-full">
              <p className="text-white font-bold text-2xl p-4">
                <Spin size="large" tip="Loading..."></Spin>
              </p>
            </div>
          )}
        </Pane>
        <Pane
          className="scrollbar-hide"
          style={{
            overflowY: "scroll",
            background: backgroundColor,
            position: "relative",
          }}
        >
          <Editor
            codeRunner={runningHandler}
            result={submissionDataHandler}
            currentTabFunction={tabsValueHandler}
          />
        </Pane>
      </SplitPane>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isRendered: state.problemData.title !== "" ? true : false,
  };
};

export default connect(mapStateToProps)(Panel2);
