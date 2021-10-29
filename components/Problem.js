import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import Topics from '../components/Blog/Topics'
import {motion} from 'framer-motion'

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

function Problem() {
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
  const [value, setValue] = useState();
  return (
    <div className="space-y-8 container p-10 mx-auto max-w-screen-xl">
      <motion.div animate={{ y: [20, 0, 0] }}>
      <h1 className="lg:text-5xl text-3xl font-extrabold">Problem <span className="text-custom-bg">List</span></h1>
      </motion.div>
      <hr />

      <motion.div  initial="hidden" animate="visible" variants={variants} >
      <div className="flex space-x-4 overflow-x-scroll lg:scrollbar-hide">
        {values.map((value) => {
          return (
            <div className="flex flex-col items-center justify-center">
              <button className="text-base rounded-xl bg-gray-800 px-2 lg:px-4 lg:py-1 hover:scale-125 transition-all ease-out">
                {value}
              </button>
            </div>
          );
        })}
      </div>
      </motion.div>
      
      {/* SEARCH BAR */}
      <motion.div  initial="hidden" animate="visible" variants={variants} >
      <div className="flex space-x-3">
        <form
          onSubmit={() => {}}
          className="p-[.2rem] flex border-none rounded-xl focus:outline-none bg-gray-800 items-center max-w-screen-2xl"
        >
          <input
            type="text"
            className="bg-gray-800 outline-none text-white p-2 rounded-xl w-full"
            placeholder="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <SearchOutlined />
        </form>
        <button type="submit" className="rounded-full  bg-gray-800 px-6 py-1">
          Search
        </button>
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
      
      <div className="flex">
        
        <Topics/>

      </div>
      
      
    </div>
  );
}

export default Problem;
