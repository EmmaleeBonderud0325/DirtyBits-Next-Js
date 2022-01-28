import { ArrowForward } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
import ReactDOM from "react-dom";

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
import { InputComponent } from "./InputComponent";

const mapping = {
  Difficulty: "Difficulty",
  E: "Easy",
  M: "Medium",
  H: "Hard",
};

export const Page1 = (props) => {
  const problemData = useSelector((state) => state.addProblemData);
  const isAdmin = useSelector((state) => state.userData.is_admin);

  const tags = useSelector((state) => state.tags);

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
      {isAdmin ? (
        <>
          <ToastContainer theme="dark" />
          <Head>
            <title>Add Problem</title>
          </Head>
          <div className="">
            <div className="">
              <form className="space-y-5">
                <InputComponent
                  label={"Problem Title"}
                  value={problemData.title}
                  dispatch={updateProblemTitle}
                  type={"text"}
                  placeholder={"Title"}
                />
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
                  <label className="text-lg lg:text-2xl ml-1 block text-white">
                    Level
                  </label>
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
                <MultiSelect label="Tags" value={tags} />
                <InputComponent
                  label={"Time Limit"}
                  value={problemData.time_Limit}
                  dispatch={updateProblemTimeLimit}
                  type={"number"}
                  placeholder={"in seconds"}
                />
                <InputComponent
                  label={"Memory Limit"}
                  value={problemData.memory_Limit}
                  dispatch={updateProblemMemoryLimit}
                  type={"number"}
                  placeholder={"in MB"}
                />
                <div className="flex justify-center items-center ">
                  <button
                    className="btn-purple py-2 text-base space-x-3"
                    onClick={(e) => handleSubmit(e)}
                  >
                    <span>Add Test Case</span>
                    <ArrowForward className="text-sm" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`bg-red-500 ${
            isAdmin && "h-[840px]"
          } flex items-center justify-center`}
        >
          <h1 className="text-white font-semibold text-4xl">
            You don't have enough privilege
          </h1>
        </div>
      )}
    </>
  );
};
