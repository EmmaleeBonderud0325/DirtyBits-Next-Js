import { ReactElement } from "react";
import { connect, useSelector } from "react-redux";
import { TabView, TabPanel as Panel } from "primereact/tabview";
import dynamic from "next/dynamic";

import { IRootState } from "../../redux/reducers";
import { problemDataI, submissionResultI } from "../../redux/interfaces";
import ProblemTab from './ProblemTab'


import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Submissions = dynamic(() => import("./submission"))

interface Props {
  userSubmissions: number;
  questionData: problemDataI;
  isBookmarkSet: boolean;
  upVote: number;
  downVote: number;
  isUpVoted: boolean;
  isDownVoted: boolean;
  inputTestCases: string[];
  outputTestCases: string[];
  codeRunner: boolean;
  currentTabFunction: (value: number) => void;
  submissionData: submissionResultI | {};
  currentTabValue: number;
}

function BasicTabs(props: Props): ReactElement {
  const { is_logged_in } = useSelector((state: IRootState) => state.userData);

  return (
    <div style={{ width: "100%", height: "100vh" }} className="scrollbar-hide">
      <TabView
        activeIndex={props.currentTabValue}
        onTabChange={(e) => {
          props.currentTabFunction(e.index);
        }}
        className="tabview-custom"
      >
        <Panel header="Problem">
          <ProblemTab {...props}/>
        </Panel>
        <Panel
          disabled={!is_logged_in}
          header="Submissions"
          leftIcon={!is_logged_in && "pi pi-lock"}
        >
          <Submissions
            isRunning={props.codeRunner}
            // @ts-ignore
            result={props.submissionData}
          />
        </Panel>
        <Panel disabled header="Discussions" leftIcon="pi pi-lock">
          <p>Discussions</p>
        </Panel>
        <Panel disabled header="Editorial" leftIcon="pi pi-lock">
          <p>Editorial</p>
        </Panel>
      </TabView>
    </div>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    userSubmissions: state.submissionCount,
    questionData: state.problemData,
    isBookmarkSet: state.isBookmarked,
    upVote: state.upvoteCount,
    downVote: state.downvoteCount,
    isUpVoted: state.isUpvoted,
    isDownVoted: state.isDownvoted,
    inputTestCases: state.inputTestCases,
    outputTestCases: state.outputTestCases,
  };
};

export default connect(mapStateToProps)(BasicTabs);
