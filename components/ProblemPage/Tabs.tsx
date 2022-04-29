import { ReactElement } from "react";
import Link from "next/link";

import { connect, useDispatch, useSelector } from "react-redux";
import SmoothList from "react-smooth-list";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import {VscCollapseAll} from 'react-icons/vsc'
import {BiTrendingUp} from 'react-icons/bi'
import { IoPlayBackOutline } from "react-icons/io5";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { TabView, TabPanel as Panel } from "primereact/tabview";

import Submissions from "./submission";
import IoTable from "./IoTable";
import {
  bookmarkStatusHandler,
  upvoteHandler,
  downvoteHandler,
} from "../../redux/actions/ProblemPage";
import { IRootState } from "../../redux/reducers";
import { problemDataI, submissionResultI } from "../../redux/interfaces";
import bar from "../../public/bar.svg";
import Image from "next/image";
import global from "../../public/global.svg";


import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

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
  const dispatch = useDispatch();

  const { is_logged_in } = useSelector((state: IRootState) => state.userData);

  let level: string;
  let color: string;
  switch (props.questionData.problem_level) {
    case "E":
      level = "Easy";
      color = "bg-green-600";
      break;
    case "M":
      level = "Medium";
      color = "bg-yellow-600";
      break;
    case "H":
      level = "Hard";
      color = "bg-red-600";
      break;
  }

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
          <div className="space-y-5 transition-all ease-in-out">
            {/* PROBLEM TITLE */}
            <SmoothList>
              <div className="inline-flex  items-center gap-2 group">
                <Link href="/problemset">
                  <a className="login-btn text-black group-hover:text-white bg-white flex items-center gap-2">
                    <IoPlayBackOutline className="text-base" />
                    <span>Problem Set</span>
                  </a>
                </Link>
              </div>
            </SmoothList>

            <SmoothList>
              <div className="font-medium text-lg text-[#a1acc0]">
                <div className="flex items-center space-x-3">
                  <span>{props.questionData.id}. </span>
                  <div>{props.questionData.title}</div>
                  {/* BOOKMARK */}
                  <div
                    onClick={() => {
                      dispatch(bookmarkStatusHandler());
                    }}
                    className={`${
                      is_logged_in ? "inline-block cursor-pointer" : "hidden"
                    } `}
                  >
                    {props.isBookmarkSet ? (
                      <BsFillBookmarkFill/>
                    ) : (
                      <BsBookmark/>
                    )}
                  </div>
                </div>
              </div>
            </SmoothList>

            {/* PROBLEM DIFFICULTY */}

            <div className="flex items-center space-x-5">
              <p className={`${color} text-sm inline px-3 py-1 rounded-xl`}>
                {level}
              </p>

              <div
                onClick={() => {
                  dispatch(upvoteHandler());
                }}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <p>{props.isUpVoted ? <AiFillLike /> : <AiOutlineLike />}</p>
                <p className="text-xs">{props.upVote}</p>
              </div>

              <div
                onClick={() => {
                  dispatch(downvoteHandler());
                }}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <p>
                  {props.isDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}
                </p>
                <p className="text-xs">{props.downVote}</p>
              </div>

              <div className="flex items-center space-x-1">
                <p>
                  <BiTrendingUp/>
                </p>
                <p className="text-xs">
                  Accuracy. {props.questionData.accuracy}%
                </p>
              </div>

              <div className="flex items-center space-x-1">
                <p>
                <VscCollapseAll/>
                </p>
                <p className="text-xs">
                  Total Submissions. {props.questionData.totalSubmissions}
                </p>
              </div>
            </div>

            {/* PROBLEM DESCRIPTION */}
            <SmoothList>
              <div className="">
                {props.questionData.problem_statement && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.questionData.problem_statement,
                    }}
                  ></div>
                )}
              </div>
            </SmoothList>

            {/* PROBLEM NOTE IF ANY */}
            {props.questionData.note && <p>Note: {props.questionData.note}</p>}

            {/* INPUT FORMAT */}
            <h2 className="text-white">Input Format</h2>
            <pre>
              {props.questionData.input_format && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.questionData.input_format,
                  }}
                ></div>
              )}
            </pre>

            {/* OUTPUT FORMAT */}
            <h2 className="text-white">Output Format</h2>
            <pre>
              {props.questionData.output_format && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.questionData.output_format,
                  }}
                ></div>
              )}
            </pre>

            {/* SAMEPLE INPUT TEST CASES */}
            <SmoothList>
              <h2 className="text-white">Sample Test Cases</h2>
              {props.inputTestCases.length > 0 &&
                props.inputTestCases.map((val, idx) => (
                  <IoTable
                    key={idx}
                    inputData={val}
                    outputData={props.outputTestCases[idx]}
                  />
                ))}
            </SmoothList>

            {/* CONSTRAINTS */}
            <SmoothList>
              <h2 className="text-white">Constraints:</h2>
              <pre>
                {props.questionData.constraints && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.questionData.constraints,
                    }}
                  ></div>
                )}
              </pre>
              <pre>Memory Limit: {props.questionData.memory_Limit} KB</pre>
              <pre>Time Limit: {props.questionData.time_Limit}s</pre>
            </SmoothList>
          </div>
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
