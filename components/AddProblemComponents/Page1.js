import { ArrowForward } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import TextEditor from "../TextEditor";
import Dropdown from "../Dropdown";
import {
  updateProblemTitle,
  updateProblemNote,
  updateProblemStatement,
  updateProblemInputFormat,
  updateProblemContraints,
  updateProblemOutputFormat,
  updateProblemMemoryLimit,
  updateProblemTimeLimit,
} from "../../redux/actions";
import MultiSelect from "../MultiSelect";
import { AddProblem } from "../api/apis";

function addproblems(props) {
  const problemData = useSelector((state) => state.addProblemData);
  const dispatch = useDispatch();

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
          props.probIdFunction(result.data["id"]);
          props.stepFunction(2);
        })
        .catch(() => {
          console.log("error");
        });
    } catch (e) {
      console.error("Token Error");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
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
              <label className="text-lg lg:text-2xl ml-1">Problem Title</label>
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
              <label className="text-lg lg:text-2xl ml-1">Output Format</label>
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
}

export default addproblems;
