import { SearchOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import { motion } from "framer-motion";
import Table from "../components/Table";
import { connect } from "react-redux";
import { updateProblemsStatus } from "../redux/actions";
import { useSelector } from "react-redux";
import { DiReact } from "react-icons/di";

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

function Problem(props) {
  const values = [
    "Array",
    "Object",
    "String",
    "Number",
    "Boolean",
    "Function",
    "Undefined",
    "Null",
  ];
  const [value, setValue] = useState("");

  const problemList = useSelector((state) => state.problemList);

  const fetchQuestions = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const filteredData = problemList.filter((val) =>
    val.title.toLowerCase().includes(value.toLowerCase())
  );

  const questionsList = () => {
    if (value === "") {
      return problemList;
    } else if (filteredData.length > 0) {
      return filteredData;
    } else {
      return [];
    }
  };
  return (
    <div className="space-y-8 container p-10 mx-auto max-w-screen-xl">
      <motion.div animate={{ y: [20, 0, 0] }}>
        {/* <h1 className="lg:text-5xl text-3xl font-extrabold text-white">
          Problem <span className="text-custom-bg">List</span>
        </h1> */}
        <div className="flex gap-10">
          <div className="space-y-3 h-40 w-40 pb-2">
            <div className="relative flex justify-center items-center h-full w-full rounded-md bg-gradient-to-r from-cyan-500 to-blue-500">
              <DiReact className="absolute text-9xl" />
            </div>
            <p className="text-white text-center">Learn React Development</p>
          </div>
          <div className="space-y-3 h-40 w-40 pb-2">
            <div className="relative flex justify-center items-center h-full w-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <DiReact className="absolute text-9xl" />
            </div>
            <p className="text-white text-center">Learn React Development</p>
          </div>
          <div className="space-y-3 h-40 w-40 pb-2">
            <div className="relative flex justify-center items-center h-full w-full rounded-md bg-gradient-to-r from-green-400 to-green-300">
              <DiReact className="absolute text-9xl" />
            </div>
            <p className="text-white text-center">Learn React Development</p>
          </div>
        </div>
      </motion.div>
      <hr style={{ color: "blue" }} />

      <motion.div initial="hidden" animate="visible" variants={variants}>
        <div className="flex sm:w-3/4 xs:w-full space-x-4 overflow-x-scroll scrollbar-hide">
          {values.map((value) => {
            return (
              <div
                key={value}
                className="flex flex-col items-center justify-center"
              >
                <button className="text-base rounded-xl bg-gray-800 px-2 lg:px-4 lg:py-1 hover:scale-125 transition-all ease-out">
                  {value}
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* SEARCH BAR */}
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <div className="flex space-x-3">
          <form
            onSubmit={() => {}}
            className="p-[.2rem] flex border-none rounded-xl focus:outline-none bg-gray-800 items-center max-w-screen-2xl"
          >
            <input
              type="text"
              className="bg-gray-800 outline-none text-white p-2 rounded-xl w-full caret-custom-bg"
              placeholder="Search"
              value={value}
              onChange={(e) => fetchQuestions(e)}
            />
            <SearchOutlined />
          </form>
          {/* <button type="submit" className="rounded-xl  bg-gray-800 px-6 py-1">
            Search
          </button> */}
        </div>
      </motion.div>

      {/* DROPDOWN SECITONS FOR DIFFICULTY , STATUS, TAGS */}
      <div className="flex space-x-2">
        <Dropdown
          textColor={"text-white"}
          fieldName={"Difficulty"}
          fieldValues={["Easy", "Medium", "Hard"]}
          bg={"bg-black"}
        />
        <Dropdown
          textColor={"text-white"}
          fieldName={"Status"}
          fieldValues={["ToDo", "Solved", "Attempted"]}
          bg={"bg-black"}
        />
      </div>

      <div className="flex flex-col">
        <Table list={questionsList()} />
      </div>
    </div>
  );
}

// export default connect(mapStateToprops, { updateProblemsStatus })(Problem);
export default Problem;
