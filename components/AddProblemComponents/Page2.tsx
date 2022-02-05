import React, { FC, ReactElement, useState } from "react";
import { uploadTestCases } from "../api/apis";
import uuid from "react-uuid";
import _ from "lodash";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { TiPlus } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { resetProblemPageData } from "../../redux/actions";
import { Button } from "@nextui-org/react";

interface Props {
  problemId: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const Page2: FC<Props> = (props): ReactElement => {
  const dispatch = useDispatch();
  let [customTestCases, changeCustomTestCases] = useState<any>([
    { id: uuid() },
  ]);
  let [testCases, changeTestCases] = useState<any>([{ id: uuid() }]);
  const addNewFileInputSC = (e: any) => {
    e.preventDefault();
    const inputID = uuid();
    const newInputs = customTestCases.concat({ id: inputID });
    changeCustomTestCases(newInputs);
  };

  const deleteFileSC = (e: any) => {
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

  const deleteFileTC = (e: any) => {
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
      <div className="overflow-hidden bg-slate-800 p-4 space-y-3 rounded-2xl shadow-2xl">
        <h1 className="text-xl lg:text-[1.5rem] text-white font-light">
          Test Case - {idx + 1}
        </h1>
        <div className="each-custom space-y-2" id={n.id}>
          <div className="lg:flex justify-center lg:space-x-10">
            <div className="lg:space-x-6 ">
              <label className="text-lg font-bold text-white">Input</label>
              <input
                type="file"
                id={sci}
                accept=".txt"
                className="filebtn"
              ></input>
            </div>
            <span className="border-r-2 border-custom-indigo hidden lg:block"></span>
            <div className="lg:space-x-6 border-custom-indigo">
              <label className="text-lg font-bold text-white">Output</label>
              <input
                type="file"
                id={sco}
                accept=".txt"
                className="filebtn"
              ></input>
            </div>
          </div>
          <div className="add-tc-close-icon">
            <button
              id={n.id}
              onClick={(e) => deleteFileSC(e)}
              className="px-3 pb-1 text-white  bg-transparent rounded-full hover:bg-white hover:text-black transition-all duration-200 text-xl ease-in-out font-bold"
            >
              x
            </button>
          </div>
        </div>
      </div>
    );
  });

  let renderListTC = testCases.map((n, idx) => {
    const tci = "tc-" + n.id + "-i";
    const tco = "tc-" + n.id + "-o";
    return (
      <div className="overflow-hidden bg-slate-800 p-4 space-y-3 rounded-2xl shadow-2xl">
        <h1 className="text-xl lg:text-[1.5rem] font-light text-white">
          Test Case - {idx + 1}
        </h1>
        <div className="each-custom" id={n.id}>
          <div className="lg:flex justify-center lg:space-x-10">
            <div className="lg:space-x-6 ">
              <label className="text-lg font-bold text-white">Input</label>
              <input
                type="file"
                id={tci}
                accept=".txt"
                className="filebtn"
              ></input>
            </div>
            <span className="border-r-2 border-custom-indigo hidden lg:block"></span>
            <div className="lg:space-x-6 border-custom-indigo">
              <label className="text-lg font-bold text-white">Output</label>
              <input
                type="file"
                id={tco}
                accept=".txt"
                className="filebtn"
              ></input>
            </div>
          </div>
          <div className="add-tc-close-icon inline-block">
            <button
              id={n.id}
              onClick={(e) => deleteFileTC(e)}
              className="px-3 pb-1  bg-transparent rounded-full hover:bg-white hover:text-black transition-all duration-200 text-xl ease-in-out font-bold text-white"
            >
              x
            </button>
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
            props.setActiveIndex(0);
            dispatch(resetProblemPageData());
          }
        });
    } catch (err) {
      console.log("Error", err.message);
    }
  };
  const submitted = (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append("custom_test_cases", customTestCases.length);
    data.append("test_cases", testCases.length);
    data.append("probId", props.problemId.toString());
    for (var i = 0; i < customTestCases.length; i++) {
      const input_file = document.getElementById(
        "sc-" + customTestCases[i].id + "-i"
        // @ts-ignore
      ).files[0];
      const output_file = document.getElementById(
        "sc-" + customTestCases[i].id + "-o"
        // @ts-ignore
      ).files[0];
      data.append("sc-input" + (i + 1), input_file);
      data.append("sc-output" + (i + 1), output_file);
    }
    for (var i = 0; i < testCases.length; i++) {
      const input_file = document.getElementById(
        "tc-" + testCases[i].id + "-i"
        // @ts-ignore
      ).files[0];
      const output_file = document.getElementById(
        "tc-" + testCases[i].id + "-o"
        // @ts-ignore
      ).files[0];
      data.append("tc-input" + (i + 1), input_file);
      data.append("tc-output" + (i + 1), output_file);
    }
    postData(data);
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <Head>
        <title>Add Test Cases</title>
      </Head>
      <div className="">
        <div className="space-y-14">
          <h3 className="font-light text-white text-center text-2xl lg:text-[1.5rem] lg:text-left">
            Sample Test Cases
          </h3>
          {renderListSC}
          <button className="btn-purple" onClick={(e) => addNewFileInputSC(e)}>
            <TiPlus />{" "}
          </button>
          <h3 className="font-light text-white text-center text-2xl lg:text-[1.5rem] lg:text-left">
            Test Cases
          </h3>
          {renderListTC}
          <button className="btn-purple" onClick={(e) => addNewFileInputTC(e)}>
            <TiPlus />{" "}
          </button>
          <div>
            <Button onClick={submitted} auto color="gradient" rounded bordered>
              Upload
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
