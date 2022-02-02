import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SmoothList from "react-smooth-list";
import { IoPlayBackOutline } from "react-icons/io5";
import Link from "next/link";
import add from "../public/add.svg";
import remove from "../public/remove.svg";
import bar from "../public/bar.svg";
import Image from "next/image";
import global from "../public/global.svg";
import lock from "../public/lock.svg";
import { FcLock } from "react-icons/fc";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import { useSelector } from "react-redux";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillSignal,
  AiFillLike,
  AiFillDislike,
  AiOutlineGlobal,
} from "react-icons/ai";
import IoTable from "./ProblemPage/IoTable";
import Submissions from "./ProblemPage/submission";
import {
  bookmarkStatusHandler,
  upvoteHandler,
  downvoteHandler,
} from "../redux/actions/ProblemPage";

import "primereact/resources/themes/mdc-dark-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { TabView, TabPanel as Panel } from "primereact/tabview";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Avatar } from "primereact/avatar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs(props) {
  const dispatch = useDispatch();

  const { is_logged_in } = useSelector((state) => state.userData);

  const handleChange = (e) => {
    props.currentTabFunction(e.index);
  };

  let level;
  let color;
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

  console.log("login", is_logged_in);

  return (
    <Box sx={{ width: "100%", height: "100vh" }} className="scrollbar-hide">
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={props.currentTabValue}
          textColor="inherit"
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <div className="p-4">
            <PhoneMissedIcon />
            <Tab label="Problem" {...a11yProps(0)} />
          </div>
          <Tab
            label={`Submissions ${props.userSubmissions}`}
            {...a11yProps(1)}
          />
          <Tab label="Discussion" {...a11yProps(2)} />
          <Tab label="start" />
          <Tab label="Editorial" {...a11yProps(3)} />
        </Tabs>
      </Box> */}
      {/* <TabPanel value={props.currentTabValue} index={0}>
        <div className="space-y-5 transition-all ease-in-out">
      
          <SmoothList>
            <div className="flex items-center gap-2 group">
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
              
                <div
                  onClick={() => {
                    dispatch(bookmarkStatusHandler());
                  }}
                  className="inline-block cursor-pointer"
                >
                  {props.isBookmarkSet ? (
                    <Image src={remove} width={30} height={30} />
                  ) : (
                
                    <Image src={add} width={30} height={30} />
                  )}
                </div>
              </div>
            </div>
          </SmoothList>

      

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
                <Image src={bar} width={30} height={30} />
              </p>
              <p className="text-xs">
                Accuracy. {props.questionData.accuracy}%
              </p>
            </div>

            <div className="flex items-center space-x-1">
              <p>
                <Image src={global} width={30} height={30} />
              </p>
              <p className="text-xs">
                Total Submissions. {props.questionData.totalSubmissions}
              </p>
            </div>
          </div>

       
          <SmoothList>
            <div className="">
              {props.questionData.problem_statement &&
                ReactHtmlParser(props.questionData.problem_statement)}
            </div>
          </SmoothList>

     
          {props.questionData.note && <p>Note: {props.questionData.note}</p>}

       
          <h2 className="text-white">Input Format</h2>
          <pre>
            {props.questionData.input_format &&
              ReactHtmlParser(props.questionData.input_format)}
          </pre>

     
          <h2 className="text-white">Output Format</h2>
          <pre>
            {props.questionData.output_format &&
              ReactHtmlParser(props.questionData.output_format)}
          </pre>

  
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

          <SmoothList>
            <h2 className="text-white">Constraints:</h2>
            <pre>
              {props.questionData.constraints &&
                ReactHtmlParser(props.questionData.constraints)}
            </pre>
            <pre>Memory Limit: {props.questionData.memory_Limit} KB</pre>
            <pre>Time Limit: {props.questionData.time_Limit}s</pre>
          </SmoothList>
        </div>
      </TabPanel>
      <TabPanel value={props.currentTabValue} index={1}>
        <Submissions
          isRunning={props.codeRunner}
          result={props.submissionData}
        />
      </TabPanel>
      <TabPanel value={props.currentTabValue} index={2}>
        Editorial
      </TabPanel>
      <TabPanel value={props.currentTabValue} index={3}>
        <Image src={lock} width={30} height={30} />
        Discussion
      </TabPanel> */}

      <TabView
        activeIndex={props.currentTabValue}
        onTabChange={handleChange}
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
                      <Image src={remove} width={30} height={30} />
                    ) : (
                      // <BsBookmarkCheckFill className="text-lg" />
                      // <BsBookmarkCheck className="text-lg" />
                      <Image src={add} width={30} height={30} />
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
                  <Image src={bar} width={30} height={30} />
                </p>
                <p className="text-xs">
                  Accuracy. {props.questionData.accuracy}%
                </p>
              </div>

              <div className="flex items-center space-x-1">
                <p>
                  <Image src={global} width={30} height={30} />
                </p>
                <p className="text-xs">
                  Total Submissions. {props.questionData.totalSubmissions}
                </p>
              </div>
            </div>

            {/* PROBLEM DESCRIPTION */}
            <SmoothList>
              <div className="">
                {props.questionData.problem_statement &&
                  ReactHtmlParser(props.questionData.problem_statement)}
              </div>
            </SmoothList>

            {/* PROBLEM NOTE IF ANY */}
            {props.questionData.note && <p>Note: {props.questionData.note}</p>}

            {/* INPUT FORMAT */}
            <h2 className="text-white">Input Format</h2>
            <pre>
              {props.questionData.input_format &&
                ReactHtmlParser(props.questionData.input_format)}
            </pre>

            {/* OUTPUT FORMAT */}
            <h2 className="text-white">Output Format</h2>
            <pre>
              {props.questionData.output_format &&
                ReactHtmlParser(props.questionData.output_format)}
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
                {props.questionData.constraints &&
                  ReactHtmlParser(props.questionData.constraints)}
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
    </Box>
  );
}

const mapStateToProps = (state) => {
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
