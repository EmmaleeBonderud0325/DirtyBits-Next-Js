import React, { memo, useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { CloudUploadOutlined } from "@mui/icons-material";
import uuid from "react-uuid";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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
  updateProblemMemoryLimit,
  updateProblemTimeLimit,
} from "../redux/actions";
import MultiSelect from "../components/MultiSelect";
import { AddProblem, uploadTestCases } from "../components/api/apis";

function addproblems(props) {
  const problemData = useSelector((state) => state.addProblemData);
  const dispatch = useDispatch();
  let [step, setStep] = useState(1);
  let [customTestCases, changeCustomTestCases] = useState([{ id: uuid() }]);
  let [testCases, changeTestCases] = useState([{ id: uuid() }]);
  let [probId, setProbId] = useState(null);

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
      <div className="overflow-hidden bg-black w-full p-4 space-y-3 rounded-2xl border border-custom-bg">
        <h1 className="lg:text-3xl text-white font-bold">
          Test Case - {idx + 1}
        </h1>
        <div className="each-custom space-y-2" id={n.id}>
          <div className="lg:flex justify-center lg:space-x-10">
            <div className="lg:space-x-6 ">
              <label className="text-lg font-bold">Input</label>
              <input type="file" id={sci} accept=".txt"></input>
            </div>
            <span className="border-r-2 border-custom-bg hidden lg:block"></span>
            <div className="lg:space-x-6 border-custom-bg">
              <label className="text-lg font-bold">Output</label>
              <input type="file" id={sco} accept=".txt"></input>
            </div>
          </div>
          <div className="add-tc-close-icon">
            <div id={n.id} onClick={(e) => deleteFileSC(e)}>
              X
            </div>
          </div>
        </div>
      </div>
    );
  });

  let renderListTC = testCases.map((n, idx) => {
    const tci = "tc-" + n.id + "-i";
    const tco = "tc-" + n.id + "-o";
    return (
      <div className="overflow-hidden bg-black p-4 space-y-3 rounded-2xl border border-custom-bg">
        <h1 className="text-3xl text-white">Test Case - {idx + 1}</h1>
        <div className="each-custom" id={n.id}>
          <div className="lg:flex justify-center lg:space-x-10">
            <div className="lg:space-x-6 ">
              <label className="text-lg font-bold">Input</label>
              <input type="file" id={tci} accept=".txt"></input>
            </div>
            <span className="border-r-2 border-custom-bg hidden lg:block"></span>
            <div className="lg:space-x-6 border-custom-bg">
              <label className="text-lg font-bold">Output</label>
              <input type="file" id={tco} accept=".txt"></input>
            </div>
          </div>
          <div className="add-tc-close-icon">
            <div id={n.id} onClick={(e) => deleteFileTC(e)}>
              X
            </div>
          </div>
        </div>
      </div>
    );
  });

  const postData = async (data) => {
    try {
      toast
        .promise(uploadTestCases.post("/", data), {
          pending: "Uploading ...",
          success: "✔️ Uploaded Successfully",
          error: "❌ Upload error try again",
        })
        .then((result) => {
          if (result.status === 200) {
            setStep(1);
          }
        });
    } catch (err) {
      console.log("Error", err.message);
    }
  };

  const submitted = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("custom_test_cases", customTestCases.length);
    data.append("test_cases", testCases.length);
    data.append("probId", probId);
    for (var i = 0; i < customTestCases.length; i++) {
      const input_file = document.getElementById(
        "sc-" + customTestCases[i].id + "-i"
      ).files[0];
      const output_file = document.getElementById(
        "sc-" + customTestCases[i].id + "-o"
      ).files[0];
      data.append("sc-input" + (i + 1), input_file);
      data.append("sc-output" + (i + 1), output_file);
    }
    for (var i = 0; i < testCases.length; i++) {
      const input_file = document.getElementById("tc-" + testCases[i].id + "-i")
        .files[0];
      const output_file = document.getElementById(
        "tc-" + testCases[i].id + "-o"
      ).files[0];
      data.append("tc-input" + (i + 1), input_file);
      data.append("tc-output" + (i + 1), output_file);
    }
    postData(data);
  };

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
    try {
      await AddProblem.post("/", { data: problemData })
        .then((result) => {
          console.log(result.data);
          setProbId(result.data["id"]);
          setStep(2);
        })
        .catch(() => {
          console.log("error");
        });
    } catch (e) {
      console.error("Token Error");
    }
  };

  let problemMarkup;
  if (step === 1) {
    problemMarkup = (
      <>
        <Head>
          <title>Add Problem</title>
        </Head>
        <div className="lg:container m-auto">
          <div className="lg:pl-36 p-5 space-y-14">
            <h1 className="text-center text-white font-extrabold text-4xl lg:text-[3rem] lg:text-left">
              Add <span className="text-custom-bg">Problems</span>
            </h1>
            <hr />
            <form className="space-y-5">
              <div className="space-y-3">
                <label className="text-lg lg:text-2xl ml-1">
                  Problem Title
                </label>
                <input
                  className="w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow"
                  placeholder="Title"
                  type="text"
                  value={problemData.title}
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
                  value={problemData.note}
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
                <label className="text-lg lg:text-2xl ml-1">
                  Output Format
                </label>
                <TextEditor dispatch={HandleOutputFormatUpdate} />
              </div>
              <div className="space-y-3">
                <label className="text-lg lg:text-2xl ml-1 block">Level</label>
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
              <div className="space-y-3">
                <label className="text-lg lg:text-2xl ml-1">Time Limit</label>
                <input
                  placeholder="in seconds"
                  type="number"
                  className="w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow"
                  onChange={(e) =>
                    dispatch(updateProblemTimeLimit(e.target.value))
                  }
                />
              </div>
              <div className="space-y-3">
                <label className="text-lg lg:text-2xl ml-1">Memory Limit</label>
                <input
                  placeholder="in MB"
                  type="number"
                  className="w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow"
                  onChange={(e) =>
                    dispatch(updateProblemMemoryLimit(e.target.value))
                  }
                />
              </div>
              <div className="flex justify-center items-center ">
                <button className="btn-purple" onClick={(e) => handleSubmit(e)}>
                  Add Test Case
                  <span className="ml-1">
                    <ArrowForward />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else if (step === 2) {
    problemMarkup = (
      <>
        <Head>
          <title>Add Test Cases</title>
        </Head>
        <div className="lg:container m-auto">
          <div className="lg:pl-36 p-5 space-y-14">
            <h1 className="font-extrabold text-white text-center text-4xl lg:text-[3rem] lg:text-left">
              Add <span className="text-custom-bg">Problems</span>{" "}
              <CloudUploadOutlined className="text-[5rem]" />
            </h1>
            <hr />
            <h3 className="font-bold text-white text-center text-2xl lg:text-[2rem] lg:text-left">
              Sample Test Cases
            </h3>
            {renderListSC}
            <button
              className="ui right floated button btn-purple"
              onClick={(e) => addNewFileInputSC(e)}
            >
              Add{" "}
            </button>
            <h3 className="font-bold text-white text-center text-2xl lg:text-[2rem] lg:text-left">
              Test Cases
            </h3>
            {renderListTC}
            <button
              className="ui right floated button btn-purple"
              onClick={(e) => addNewFileInputTC(e)}
            >
              Add{" "}
            </button>
            <div>
              <button
                className="ui right floated button btn-purple"
                onClick={submitted}
              >
                Upload Test Cases{" "}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer theme="dark" />
      {problemMarkup}
    </>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     problemData: state.addProblemData,
//   };
// };

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

export default addproblems;

// export default memo(
//   connect(mapStateToProps, {
//     updateProblemTitle,
//     updateProblemStatement,
//     updateProblemNote,
//     updateProblemInputFormat,
//     updateProblemContraints,
//     updateProblemOutputFormat,
//     updateProblemTags,
//   })(addproblems)
// );
