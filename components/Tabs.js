import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReactHtmlParser from "react-html-parser";
import { useEffect } from "react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillSignal,
  AiFillLike,
  AiFillDislike,
  AiOutlineGlobal,
} from "react-icons/ai";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import IoTable from "./ProblemPage/IoTable";
import { memo } from "react";
import {
  getProblemPageDataApi,
  getSubmissionsList,
  upAndDownVoteHandler,
} from "./api/apis";
import Cookies from "js-cookie";
import Gettoken from "./Helper/Gettoken";

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

function BasicTabs({ questionData }) {
  const [value, setValue] = React.useState(0);
  const [inputTestCases, setInputTestCases] = React.useState([]);
  const [outputTestCases, setOutputTestCases] = React.useState([]);
  const [upVote, setUpVote] = React.useState(0);
  const [downVote, setDownVote] = React.useState(0);
  const [isUpVoted, setIsUpVoted] = React.useState(false);
  const [isDownVoted, setIsDownVoted] = React.useState(false);
  const [isBookmarkSet, setIsBookmarkSet] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let level;
  let color;
  switch (questionData.problem_level) {
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

  const GetInputTestCases = async () => {
    var inputTestCases = [];
    for (let i = 1; i <= questionData.sample_Tc; i++) {
      const result = fetch(
        `https://res.cloudinary.com/hhikcz56h/raw/upload/v1636969572/TestCases/${questionData.id}/sc-input${i}.txt`
      ).then((response) => {
        return response.text();
      });
      await result.then((response) => {
        inputTestCases.push(response);
      });
    }
    setInputTestCases(inputTestCases);
    return;
  };

  const GetOutputTestCases = async () => {
    var outputTestCases = [];
    for (let i = 1; i <= questionData.sample_Tc; i++) {
      const result = fetch(
        `https://res.cloudinary.com/hhikcz56h/raw/upload/v1636969572/TestCases/${questionData.id}/sc-output${i}.txt`
      ).then((response) => {
        return response.text();
      });
      await result.then((response) => {
        outputTestCases.push(response);
      });
    }
    setOutputTestCases(outputTestCases);
    return;
  };

  const getTestCases = () => {
    GetInputTestCases();
    GetOutputTestCases();
  };

  const getProblemPageData = async () => {
    if (!Cookies.get("refresh")) {
      console.error("upvote downvote", "Login Required !!");
      return;
    }
    const acces_token = Cookies.get("access");
    if (!acces_token) {
      await Gettoken(Cookies.get("refresh"));
    }
    await getProblemPageDataApi
      .post(
        "/",
        { problem_id: questionData.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${Cookies.get("access")}`,
          },
        }
      )
      .then((result) => {
        setIsUpVoted(result.data.upvote);
        setIsDownVoted(result.data.downvote);
      });
  };

  useEffect(() => {
    getTestCases();
    setUpVote(questionData.up_votes);
    setDownVote(questionData.down_votes);
    getProblemPageData();
  }, []);

  const upVoteHandler = async () => {
    const response = await upAndDownVoteHandler.post(
      "/",
      {
        data: {
          problem_id: questionData.id,
          type: "upvote",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${Cookies.get("access")}`,
        },
      }
    );
    setIsUpVoted(!isUpVoted);
    isUpVoted ? setUpVote((prev) => prev - 1) : setUpVote((prev) => prev + 1);
    if (downVote > 0) {
      setDownVote((prev) => prev - 1);
    }
  };

  const downVoteHandler = async () => {
    const response = await upAndDownVoteHandler.post(
      "/",
      {
        data: {
          problem_id: questionData.id,
          type: "downvote",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${Cookies.get("access")}`,
        },
      }
    );
    setIsDownVoted(!isDownVoted);
    isDownVoted
      ? setDownVote((prev) => prev - 1)
      : setDownVote((prev) => prev + 1);
    if (upVote > 0) {
      setUpVote((prev) => prev - 1);
    }
  };

  // const submissionsListHandler = async () => {
  //   const {data} = getSubmissionsList.
  // }

  // GET THE CURRENT STATUS OF BOOKMARK FOR THE CURRENT USER
  const getBookmarkStatus = () => {
    // SET THE STATE OF THE BOOKMARK BASED ON THE API RESPONSE
  };

  const bookMarkHandler = () => {
    setIsBookmarkSet(!isBookmarkSet);
  };

  console.log("TABS COMPONENT RENDERED");
  return (
    <Box sx={{ width: "100%", height: "100vh" }} className="scrollbar-hide">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          textColor="inherit"
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Problem" {...a11yProps(0)} />
          <Tab
            label={`Submissions ${questionData.totalSubmissions}`}
            {...a11yProps(1)}
          />
          <Tab label="Discussion" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="space-y-5 transition-all ease-in-out">
          {/* PROBLEM TITLE */}

          <p className="font-medium text-lg text-[#a1acc0]">
            <span>{questionData.id}. </span>
            {questionData.title}
          </p>

          {/* BOOKMARK */}
          <div onClick={bookMarkHandler}>
            {isBookmarkSet ? (
              <BsBookmarkCheckFill className="text-lg" />
            ) : (
              <BsBookmarkCheck className="text-lg" />
            )}
          </div>
          {/* PROBLEM DIFFICULTY */}

          <div className="flex items-center space-x-5">
            <p className={`${color} text-sm inline px-3 py-1 rounded-xl`}>
              {level}
            </p>

            <div
              onClick={upVoteHandler}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <p>{isUpVoted ? <AiFillLike /> : <AiOutlineLike />}</p>
              <p className="text-xs">UpVotes. {upVote}</p>
            </div>

            <div
              onClick={downVoteHandler}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <p>{isDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}</p>
              <p className="text-xs">DownVotes. {downVote}</p>
            </div>

            <div className="flex items-center space-x-1">
              <p>
                <AiFillSignal />
              </p>
              <p className="text-xs">Accuracy. {questionData.accuracy}%</p>
            </div>

            <div className="flex items-center space-x-1">
              <p>
                <AiOutlineGlobal />
              </p>
              <p className="text-xs">
                Total Submissions. {questionData.totalSubmissions}
              </p>
            </div>
          </div>

          {/* PROBLEM DESCRIPTION */}

          <div className="">
            {questionData.problem_statement &&
              ReactHtmlParser(questionData.problem_statement)}
          </div>

          {/* PROBLEM NOTE IF ANY */}
          {questionData.note && <p>Note: {questionData.note}</p>}

          {/* INPUT FORMAT */}
          <h2 className="text-white">Input Format</h2>
          <pre>
            {questionData.input_format &&
              ReactHtmlParser(questionData.input_format)}
          </pre>

          {/* OUTPUT FORMAT */}
          <h2 className="text-white">Output Format</h2>
          <pre>
            {questionData.output_format &&
              ReactHtmlParser(questionData.output_format)}
          </pre>

          {/* SAMEPLE INPUT TEST CASES */}
          <h2 className="text-white">Sample Test Cases</h2>
          {inputTestCases.length > 0 &&
            inputTestCases.map((val, idx) => (
              <IoTable
                key={idx}
                inputData={val}
                outputData={outputTestCases[idx]}
              />
            ))}

          {/* CONSTRAINTS */}
          <h2 className="text-white">Constraints:</h2>
          <pre>
            {questionData.constraints &&
              ReactHtmlParser(questionData.constraints)}
          </pre>
          <pre>Memory Limit: {questionData.memory_Limit} KB</pre>
          <pre>Time Limit: {questionData.time_Limit}s</pre>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Submissions
      </TabPanel>
      <TabPanel value={value} index={2}>
        Discussion
      </TabPanel>
    </Box>
  );
}

export default memo(BasicTabs);
