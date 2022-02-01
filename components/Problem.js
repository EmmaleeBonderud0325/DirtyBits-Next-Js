import { SearchOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import Table from "../components/Table";
import plus from "../public/plus.svg";
import google from "../public/google.svg";
import amazon from "../public/amazon.svg";
import apple from "../public/apple.svg";
import fb from "../public/fb.svg";
import microsoft from "../public/microsoft.svg";
import CompanyTags from "./CompanyTags/CompanyTags";
import { useSelector } from "react-redux";
import { MultiSelect } from "primereact/multiselect";
import { filterProblemData } from "./api/apis";
import WrapperLayout from "../Layout/Layout";

import "primereact/resources/themes/mdc-dark-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const styles = {
  minWidth: "15rem",
  padding: ".25rem .5rem",
  borderRadius: "3px",
  display: "inline-flex",
  marginRight: ".5rem",
  backgroundColor: "#111827",
};

function Problem(props) {
  const values = useSelector((state) => state.tags);

  const [value, setValue] = useState("");

  const [difficulty, setDifficulty] = useState("Difficulty");
  const [status, setStatus] = useState("Status");
  const [timeoutId, setTimeoutId] = useState();
  const [tags, setTags] = useState([]);
  const [currentDataList, setCurrentDataList] = useState([]);

  useEffect(() => {
    async function getData() {
      if (tags.length > 0) {
        const response = await filterProblemData.post("/", {
          keyword: value,
          tags: tags,
          difficulty: [],
        });
        setCurrentDataList(response.data);
      } else {
        setCurrentDataList(props.problemList);
      }
    }
    getData();
  }, [tags, props.problemList, value]);

  console.log("current value", value);

  const valueHandler = (e) => {
    setValue(e.target.value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(async () => {
      const data = {
        keyword: e.target.value,
        tags: tags,
        difficulty: [],
      };

      console.log("send req ", e.target.value);

      const response = await filterProblemData.post("/", data);
      setCurrentDataList(response.data);
    }, 2000);
    setTimeoutId(timeoutId);
  };

  return (
    <WrapperLayout>
      <motion.div animate={{ y: [20, 0, 0] }}>
        <div className="flex gap-10">
          <CompanyTags icon={google} title="Top google Questions" />
          <CompanyTags icon={fb} title="Top facebook Questions" />
          <CompanyTags icon={amazon} title="Top amazon Questions" />
          <CompanyTags icon={microsoft} title="Top microsoft Questions" />
          <CompanyTags icon={apple} title="Top apple Questions" />
          <CompanyTags icon={plus} title="More" />
        </div>
      </motion.div>
      <br />
      <br />
      <hr />
      <br />

      <MultiSelect
        style={styles}
        value={tags}
        options={values}
        onChange={(e) => setTags(e.value)}
        optionLabel="label"
        placeholder="Select Tags"
        display="chip"
      />

      {/* SEARCH BAR */}

      <div className="flex space-x-3 w-3/4">
        <form
          onSubmit={() => {}}
          className="p-[.2rem] flex border-none rounded-xl focus:outline-none bg-gray-900 items-center w-1/2 border border-rose-600"
        >
          <SearchOutlined className="text-custom-indigo ml-1" />
          <input
            type="text"
            className="bg-gray-900 placeholder:text-lg text-lg outline-none text-white p-2 rounded-lg w-full caret-custom-indigo"
            placeholder="Search questions"
            value={value}
            onChange={valueHandler}
          />
        </form>
      </div>

      {/* DROPDOWN SECITONS FOR DIFFICULTY , STATUS, TAGS */}
      {/* <div className="flex space-x-2">
        <Dropdown
          textColor={"text-white"}
          fieldName={"Difficulty"}
          fieldValues={["Easy", "Medium", "Hard"]}
          bg={"bg-gray-900"}
          hasAction={false}
          currentValue={difficulty}
          actionFunction={setDifficulty}
        />
        <Dropdown
          textColor={"text-white"}
          fieldName={"Status"}
          fieldValues={["ToDo", "Solved", "Attempted"]}
          bg={"bg-gray-900"}
          hasAction={false}
          currentValue={status}
          actionFunction={setStatus}
        />
      </div> */}

      <div className="flex flex-col">
        <Table dataList={currentDataList} />
      </div>
    </WrapperLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    problemList: state.problemList,
  };
};

export default connect(mapStateToProps)(Problem);
