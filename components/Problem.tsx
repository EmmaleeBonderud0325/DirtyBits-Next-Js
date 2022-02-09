import { AiOutlineSearch } from "react-icons/ai";
import { ReactElement, useEffect, useState, } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import Table from "./Table";
import plus from "../public/plus.svg";
import google from "../public/google.svg";
import amazon from "../public/amazon.svg";
import apple from "../public/apple.svg";
import fb from "../public/fb.svg";
import microsoft from "../public/microsoft.svg";
import CompanyTags from "./CompanyTags/CompanyTags";
import { useSelector } from "react-redux";
// import { MultiSelect } from "primereact/multiselect";
import { filterProblemData } from "./api/apis";
import WrapperLayout from "../Layout/Layout";

import "primereact/resources/themes/mdc-dark-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { IRootState } from "../redux/reducers";
import { problemListI } from "../redux/interfaces";
import { MultiSelect , Input } from '@mantine/core';
import { Checkbox } from '@nextui-org/react';



interface Props {
  problemList: problemListI[];
}

function Problem(props: Props): ReactElement {
  const values = useSelector((state: IRootState) => state.tags);

  const [value, setValue] = useState<string>("");

  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("Status");
  let [timeoutId, setTimeoutId] = useState();
  const [tags, setTags] = useState([]);
  const [currentDataList, setCurrentDataList] = useState<problemListI[]>([]);


  useEffect(() => {
    async function getData() {
      if (tags.length > 0 || difficulty.length > 0) {
        const response = await filterProblemData.post<problemListI[]>("/", {
          keyword: value,
          tags: tags,
          difficulty: difficulty,
        });
        setCurrentDataList(response.data);
      } else {
        setCurrentDataList(props.problemList);
      }
    }
    getData();
  }, [tags, props.problemList, value, difficulty]);

  let TimeOutId: any;

  const valueHandler = (e: any) => {
    setValue(e.target.value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    TimeOutId = setTimeout(async () => {
      const data = {
        keyword: e.target.value,
        tags: tags,
        difficulty: difficulty,
      };

      const response = await filterProblemData.post<problemListI[]>("/", data);
      setCurrentDataList(response.data);
    }, 2000);
    setTimeoutId(TimeOutId);
  };

  return (
    <WrapperLayout>
      <motion.div animate={{ y: [20, 0, 0] }}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-10 ">
          <CompanyTags icon={google} title="Top questions" />
          <CompanyTags icon={fb} title="Top questions" />
          <CompanyTags icon={amazon} title="Top questions" />
          <CompanyTags icon={microsoft} title="Top questions" />
          <CompanyTags icon={apple} title="Top questions" />
          <CompanyTags icon={plus} title="More" />
        </div>
      </motion.div>
      <br />
      <hr />
      <br />

      <MultiSelect
      // @ts-ignore
      data={values}
      className="w-1/2"
        label="Select Tags"
        placeholder="Pick all that you like"
        searchable
        nothingFound="Nothing found"
        clearable
        onChange={(e) => setTags(e)}
        radius="xl"
      />

      {/* SEARCH BAR */}

      <div className="space-x-3 w-full block">
        {/* <form
          onSubmit={() => {}}
          className="p-[.2rem] flex border-none rounded-xl focus:outline-none bg-gray-900 items-center md:w-1/2 border border-rose-600"
        >
          <AiOutlineSearch className="text-custom-indigo ml-1 text-xl" />
          <input
            type="text"
            className="bg-gray-900 placeholder:text-lg text-lg outline-none text-white p-2 rounded-lg w-full caret-custom-indigo"
            placeholder="Search questions"
            value={value}
            onChange={valueHandler}
          />
        </form> */}
        <Input
        className="w-1/2"
  icon={<AiOutlineSearch className="text-custom-indigo"/>}
  placeholder="Search Questions"
  styles={{ rightSection: { pointerEvents: 'none' } }}
  radius="xl"
  value={value}
  onChange={valueHandler}
/>
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
<div className="space-y-2">
<label className="text-[13px] text-[#C1C2C5] font-semibold tracking-wider">Select Difficulty</label>

<Checkbox.Group aria-label="Select difficulty" onChange={(e) => setDifficulty(e)} size="sm"   color="success" value={[]} row>
    <Checkbox size="sm" color="success" rounded value="E">
      <span className="text-slate-500">Easy</span>
    </Checkbox>
    <Checkbox size="sm" color="warning" rounded value="M">
    <span className="text-slate-500">Medium</span>
    </Checkbox>
    <Checkbox size="sm" color="error" rounded value="H">
    <span className="text-slate-500">Hard</span>
    </Checkbox>
  </Checkbox.Group>


      <div className="flex flex-col">
        <Table dataList={currentDataList} />
      </div>
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
