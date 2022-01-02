import { ArrowForward } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { TextEditor } from "./TextEditor";
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
  updateProblemLevel,
} from "../../redux/actions";
import MultiSelect from "./MultiSelect";
import { AddProblem } from "../api/apis";
import { TextAreaComponent } from "./TextAreaComponent";

export const Page1 = (props) => {
  const problemData = useSelector((state) => state.addProblemData);
  const dispatch = useDispatch();

  const mapping = {
    Difficulty: "Difficulty",
    E: "Easy",
    M: "Medium",
    H: "Hard",
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
            <TextEditor
              label="Problem Statement"
              dispatch={updateProblemStatement}
            />
            <TextAreaComponent
              label="Note"
              value={problemData.note}
              dispatch={updateProblemNote}
            />
            <TextEditor
              label="Input Format"
              dispatch={updateProblemInputFormat}
            />
            <TextEditor
              label="Constraints"
              dispatch={updateProblemContraints}
            />
            <TextEditor
              label="Output Format"
              dispatch={updateProblemOutputFormat}
            />
            <div className="space-y-3">
              <label className="text-lg lg:text-2xl ml-1 block">Level</label>
              <Dropdown
                fieldName={"Difficulty"}
                fieldValues={["Easy", "Medium", "Hard"]}
                bg={"bg-white"}
                textColor={"text-black"}
                hasAction={true}
                currentValue={mapping[problemData.problem_level]}
                actionFunction={updateProblemLevel}
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
};
