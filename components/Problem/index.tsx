import { AiOutlineSearch } from "react-icons/ai";
import { ReactElement, useContext, useEffect, useState, } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import Table from "../Table";

import {GoogleIcon, FacebookIcon, AmazonIcon, MicrosoftIcon, PlusIcon, AppleIcon} from '../../SVG'

import CompanyTags from "../CompanyTags/CompanyTags";
import { filterProblemData } from "../api/apis";
import WrapperLayout from "../../Layout/Layout";


import { problemListI } from "../../redux/interfaces";
import { MultiSelect , Input } from '@mantine/core';
import { Checkbox } from '@nextui-org/react';
import { Context } from "../../Context";



interface Props {
  problemList: problemListI[];
}

function Problem(props: Props): ReactElement {

  const [value, setValue] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  let [timeoutId, setTimeoutId] = useState();
  const [tags, setTags] = useState([]);
  const [currentDataList, setCurrentDataList] = useState<problemListI[]>([]);
  
  const {tags :tagsList} = useContext(Context)

  console.log('taglist', tagsList)
  
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
          <CompanyTags Icon={<GoogleIcon/>} title="Top questions" />
          <CompanyTags Icon={<FacebookIcon/>} title="Top questions" />
          <CompanyTags Icon={<AmazonIcon/>} title="Top questions" />
          <CompanyTags Icon={<MicrosoftIcon/>} title="Top questions" />
          <CompanyTags Icon={<AppleIcon/>} title="Top questions" />
          <CompanyTags Icon={<PlusIcon/>} title="More" />
        </div>
      </motion.div>
      <br />
      <hr />
      <br />

      <MultiSelect
      // @ts-ignore
      data={tagsList}
      className="w-full md:w-1/2"
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
        <Input
          className="w-full md:w-1/2"
          icon={<AiOutlineSearch className="text-custom-indigo"/>}
          placeholder="Search Questions"
          styles={{ rightSection: { pointerEvents: 'none' } }}
          radius="xl"
          value={value}
          onChange={valueHandler}
        />
      </div>

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