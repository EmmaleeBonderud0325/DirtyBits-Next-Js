import { CloudUploadOutlined } from "@mui/icons-material";
import React from "react";
import Upload from "../components/Upload/Upload";

function addtestcases() {
  return (
    <div className="lg:container m-auto">
      <div className="lg:pl-36 p-5 space-y-14">
        <h1 className="text-center text-4xl lg:text-[3rem] lg:text-left">
          Add Problems <CloudUploadOutlined className="text-[5rem]" />
        </h1>
        <hr />
        <button className="rounded-full bg-custom-yellow2 py-2 px-2 ">
          Add Test Case
        </button>
        <div className="bg-black p-4 space-y-3 rounded-2xl">
          <h1 className="text-3xl">Test Case 1</h1>
          <p>Input</p>
          <Upload />
          <p>Output</p>
          <Upload />
        </div>
        <div className="bg-black p-4 space-y-3">
          <h1 className="text-3xl">Test Case 2</h1>
          <p>Input</p>
          <Upload />
          <p>Output</p>
          <Upload />
        </div>
        <div className="bg-black p-4 space-y-3">
          <h1 className="text-3xl">Test Case 3</h1>
          <p>Input</p>
          <Upload />
          <p>Output</p>
          <Upload />
        </div>
      </div>
    </div>
  );
}

export default addtestcases;
