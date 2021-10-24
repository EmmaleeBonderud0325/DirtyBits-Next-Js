import React, { memo, useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import { connect, useDispatch } from "react-redux";
import Upload from "../components/Upload/Upload";
import _ from "lodash";
import { CloudUploadOutlined } from "@mui/icons-material";
import uuid from "react-uuid";

import TextEditor from "../components/TextEditor";
import Dropdown from "../components/Dropdown";
import {
  updateProblemTitle,
  updateProblemNote,
  updateProblemStatement,
  updateProblemInputFormat,
  updateProblemContraints,
  updateProblemOutputFormat,
  updateProblemTags,
} from "../redux/actions";
import axios from "axios";
import MultiSelect from "../components/MultiSelect";
import { AddProblem } from "../components/api/apis";
import Cookies from "js-cookie";
import Gettoken from "../components/Helper/Gettoken";

function addproblems(props) {
  const dispatch = useDispatch();

  let [customTestCases, changeCustomTestCases] = useState([{ id: uuid() }]);
  let [testCases, changeTestCases] = useState([{ id: uuid() }]);

  const addNewFileInputSC = (e) => {
    e.preventDefault();
    const inputID = uuid();
    const newInputs = customTestCases.concat({ id: inputID });
    changeCustomTestCases(newInputs);
  };

  const deleteFileSC = (e) => {
    e.preventDefault();
    let temp = _.cloneDeep(customTestCases);
    var id = e.target.id;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp.splice(i, 1);
        break;
      }
    }
    changeCustomTestCases(temp);
  };

  const deleteFileTC = (e) => {
    e.preventDefault();
    let temp = _.cloneDeep(testCases);
    var id = e.target.id;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp.splice(i, 1);
        break;
      }
    }
    changeTestCases(temp);
  };

  const addNewFileInputTC = (e) => {
    e.preventDefault();
    const inputID = uuid();
    const newInputs = testCases.concat({ id: inputID });
    changeTestCases(newInputs);
  };

  let renderListSC = customTestCases.map((n, idx) => {
    const sci = "sc-" + n.id + "-i";
    const sco = "sc-" + n.id + "-o";
    return (
      <div className="bg-black p-4 space-y-3 rounded-2xl">
        <h1 className="text-3xl">Test Case - {idx + 1}</h1>
        <div className="each-custom" id={n.id}>
          <div>
            <label>Input</label>
            <input type="file" id={sci} accept=".txt"></input>
          </div>
          <div>
            <label>Output</label>
            <input type="file" id={sco} accept=".txt"></input>
          </div>
          <div className="add-tc-close-icon">
            <i
              className="large close icon"
              id={n.id}
              onClick={(e) => deleteFileSC(e)}
            >
              close
            </i>
          </div>
        </div>
      </div>
    );
  });

  let renderListTC = testCases.map((n, idx) => {
    const tci = "tc-" + n.id + "-i";
    const tco = "tc-" + n.id + "-o";
    return (
      <div className="bg-black p-4 space-y-3 rounded-2xl">
        <h1 className="text-3xl">Test Case - {idx + 1}</h1>
        <div className="each-custom" id={n.id}>
          <div>
            <label>Input</label>
            <input type="file" id={tci} accept=".txt"></input>
          </div>
          <div>
            <label>Output</label>
            <input type="file" id={tco} accept=".txt"></input>
          </div>
          <div className="add-tc-close-icon">
            <i
              className="large close icon"
              id={n.id}
              onClick={(e) => deleteFileTC(e)}
            >
              close
            </i>
          </div>
        </div>
      </div>
    );
  });

  const [step, setStep] = React.useState(2);

  const HandleProblemStatementUpdate = (data) => {
    dispatch(updateProblemStatement(data));
  };

  const HandleInputFormatUpdate = (data) => {
    dispatch(updateProblemInputFormat(data));
  };

  const HandleConstraintsUpdate = (data) => {
    dispatch(updateProblemContraints(data));
  };

  const HandleOutputFormatUpdate = (data) => {
    dispatch(updateProblemOutputFormat(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.problemData);
    await Gettoken(Cookies.get("refresh"));
    await AddProblem.post(
      "/",
      { data: props.problemData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + Cookies.get("access"),
        },
      }
    )
      .then((result) => {
        console.log(result.data);
        setStep(2);
      })
      .catch(() => {
        console.log("error");
      });
  };

  let problemMarkup;
  if (step === 1) {
    problemMarkup = (
      <div className="lg:container m-auto">
        <div className="lg:pl-36 p-5 space-y-14">
          <h1 className="text-center text-4xl lg:text-[3rem] lg:text-left">
            Add Problems
          </h1>
          <hr />
          <form className="space-y-5">
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1">Problem Title</label>
              <input
                className="w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow"
                placeholder="Title"
                type="text"
                value={props.problemData.title}
                onChange={(e) => dispatch(updateProblemTitle(e.target.value))}
              />
            </div>
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1">
                Problem Statement
              </label>
              <TextEditor dispatch={HandleProblemStatementUpdate} />
            </div>
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1">Note</label>
              <textarea
                className="w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow"
                placeholder="Write a short description of the problem ..."
                value={props.problemData.note}
                onChange={(e) => dispatch(updateProblemNote(e.target.value))}
                rows="4"
              />
            </div>
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1">Input Format</label>
              <TextEditor dispatch={HandleInputFormatUpdate} />
            </div>
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1">Constraints</label>
              <TextEditor dispatch={HandleConstraintsUpdate} />
            </div>
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1">Output Format</label>
              <TextEditor dispatch={HandleOutputFormatUpdate} />
            </div>
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1">Level</label>
              <Dropdown
                fieldName={"Difficulty"}
                fieldValues={["Easy", "Medium", "Hard"]}
                bg={"bg-white"}
                textColor={"text-black"}
              />
            </div>
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1">Tags</label>
              <MultiSelect value={props.tags} />
            </div>
            <div className="flex justify-center items-center ">
              <button
                className="font-bold bg-custom-yellow2 rounded-full px-5 py-2 outline-none border-none hover:bg-custom-yellow transition ease-out"
                onClick={(e) => handleSubmit(e)}
              >
                Add Test Case
                <span className="ml-1">
                  <ArrowForward />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (step === 2) {
    problemMarkup = (
      <div className="lg:container m-auto">
        <div className="lg:pl-36 p-5 space-y-14">
          <h1 className="text-center text-4xl lg:text-[3rem] lg:text-left">
            Add Problems <CloudUploadOutlined className="text-[5rem]" />
          </h1>
          <hr />
          <h3 className="text-center text-2xl lg:text-[2rem] lg:text-left">
            Sample Test Cases
          </h3>
          {renderListSC}
          <button
            class="ui right floated button"
            onClick={(e) => addNewFileInputSC(e)}
          >
            Add{" "}
          </button>
          {/* <button className="rounded-full bg-custom-yellow2 py-2 px-2 ">
            Add Test Case
          </button> */}

          {/* <div className="bg-black p-4 space-y-3 rounded-2xl">
            <h1 className="text-3xl">Test Case 1</h1>
            <div className="lg:flex lg:justify-center lg:space-x-16">
              <p>Input</p>
              <Upload />
              <span className="hidden md:block border-l-4 border-white" />
              <p>Output</p>
              <Upload />
            </div>
          </div> */}
          <h3 className="text-center text-2xl lg:text-[2rem] lg:text-left">
            Test Cases
          </h3>
          {renderListTC}
          <button
            class="ui right floated button"
            onClick={(e) => addNewFileInputTC(e)}
          >
            Add{" "}
          </button>
        </div>
      </div>
    );
  }

  return <>{problemMarkup}</>;
}
const mapStateToProps = (state) => {
  return {
    problemData: state.addProblemData,
  };
};

export const getServerSideProps = async (ctx) => {
  const response = await axios.get(
    "https://db-code.herokuapp.com/problems/getTagListCreateProblem/"
  );
  const parseData = response.data.results;
  let colourOptions = [];
  for (const data in parseData) {
    let tempData = {};
    tempData["value"] = parseData[data].id;
    tempData["label"] = parseData[data].name;
    tempData["color"] = "#4C0F89";
    colourOptions.push(tempData);
  }
  return {
    props: {
      tags: colourOptions,
    },
  };
};

export default memo(
  connect(mapStateToProps, {
    updateProblemTitle,
    updateProblemStatement,
    updateProblemNote,
    updateProblemInputFormat,
    updateProblemContraints,
    updateProblemOutputFormat,
    updateProblemTags,
  })(addproblems)
);
