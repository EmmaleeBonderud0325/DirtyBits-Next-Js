import { useState, useEffect, ReactElement } from "react";
import SplitPane, { Pane } from "react-split-pane";
import { useDispatch, connect } from "react-redux";

import Editor from "./Editor";
import Tabs from "./Tabs";
import { unMountEditorPage } from "../../redux/actions/ProblemPage";
import { IRootState } from "../../redux/reducers";
import { submissionResultI } from "../../redux/interfaces";

interface Props {
  isRendered: boolean;
}

function Panel2(props: Props): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(unMountEditorPage());
    };
  }, []);

  const [tabsValue, setTabsValue] = useState<number>(0);
  const [resultData, setResultData] = useState<submissionResultI | {}>({});
  const [running, setIsRunning] = useState<boolean>(false);

  const tabsValueHandler = (value: number): void => {
    setTabsValue(value);
  };

  const submissionDataHandler = (value: submissionResultI | {}): void => {
    setResultData(value);
  };

  const runningHandler = (value: boolean): void => {
    setIsRunning(value);
  };

  const backgroundColor: string = "#060F1E";

  return (
    <div>
      <SplitPane
        split="vertical"
        minSize={400}
        maxSize={1200}
        defaultSize={900}
        style={{ height: "100vh" }}
        className="scrollbar-hide"
      >
        <Pane
          className="scrollbar-hide"
          style={{ overflowY: "scroll", backgroundColor: '#111827' }}
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
                Loading...
              </p>
            </div>
          )}
        </Pane>
        <Pane
          className="scrollbar-hide"
          style={{
            overflowY: "scroll",
            // position: "relative",
            backgroundColor: '#050C1B'
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

const mapStateToProps = (state: IRootState) => {
  return {
    isRendered: state.problemData.title !== "" ? true : false,
  };
};

export default connect(mapStateToProps)(Panel2);
