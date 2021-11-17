import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReactHtmlParser from "react-html-parser";
import { useEffect } from "react";

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

export default function BasicTabs({ questionData }) {
  const [value, setValue] = React.useState(0);
  const [inputTestCases, setInputTestCases] = React.useState([]);
  const [outputTestCases, setOutputTestCases] = React.useState([]);
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
    for (let i = 1; i <= 3; i++) {
      const result = fetch(
        `https://res.cloudinary.com/hhikcz56h/raw/upload/v1636969572/TestCases/7/sc-input${i}.txt`
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
    for (let i = 1; i <= 3; i++) {
      const result = fetch(
        `https://res.cloudinary.com/hhikcz56h/raw/upload/v1636969572/TestCases/7/sc-output${i}.txt`
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

  useEffect(() => {
    getTestCases();
  }, []);

  console.log("inputTcdss", inputTestCases);
  console.log("outputTcd", outputTestCases);
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
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

          {/* PROBLEM DIFFICULTY */}

          <div className="flex items-center space-x-5">
            <p className={`${color} inline px-3 py-1 rounded-xl`}>{level}</p>
            <p className="text-xs">UpVotes. {questionData.up_votes}</p>
            <p className="text-xs">DownVotes. {questionData.down_votes}</p>
            <p className="text-xs">Accuracy. {questionData.accuracy}%</p>
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
          {questionData.input_format &&
            ReactHtmlParser(questionData.input_format)}

          {/* OUTPUT FORMAT */}
          <h2 className="text-white">Output Format</h2>
          {questionData.output_format &&
            ReactHtmlParser(questionData.output_format)}

          {/* SAMEPLE INPUT TEST CASES */}
          <h2 className="text-white">Sample Test Cases</h2>
          <div className="select-none bg-gray-700 rounded-xl p-2">
            {inputTestCases.map((val) => (
              <pre>{val}</pre>
            ))}
          </div>

          {/* SAMEPLE OUTPUT TEST CASES */}
          <h2 className="text-white">Sample Test Cases</h2>
          <div className="select-none bg-gray-700 rounded-xl p-2">
            {outputTestCases.map((val) => (
              <pre>{val}</pre>
            ))}
          </div>

          {/* CONSTRAINTS */}
          <h2 className="text-white">Constraints:</h2>
          {questionData.constraints &&
            ReactHtmlParser(questionData.constraints)}
          <p>Memory Limit: {questionData.memory_Limit} KB</p>
          <p>Time Limit: {questionData.time_Limit}s</p>
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
