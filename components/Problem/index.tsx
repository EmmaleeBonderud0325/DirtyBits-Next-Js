import { ReactElement, useCallback, useContext, useEffect, useState, } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { MultiSelect , Input } from '@mantine/core';
import { CheckboxGroup, Checkbox } from '@mantine/core';

import Table from "../Table";
import {GoogleIcon, FacebookIcon, AmazonIcon, MicrosoftIcon, PlusIcon, AppleIcon} from '../../SVG'
import CompanyTags from "../CompanyTags/CompanyTags";
import { filterProblemData } from "../api/apis";
import WrapperLayout from "../../Layout/Layout";
import { problemListI } from "../../redux/interfaces";
import { Context } from "../../Context";
import {debounce} from '../../utils'


function Problem(props): ReactElement {
  const companyData = [
    {
      id: 1,
    Icon: <GoogleIcon/>,
    name: "Google Questions",
  }, 
  {
    id: 2,
    Icon: <FacebookIcon/>,
    name: "Facebook Questions",
  },
  {
    id: 3,
    Icon: <AmazonIcon/>,
    name: "Amazon Questions",
  },
  {
    id: 4,
    Icon: <MicrosoftIcon/>,
    name: "Microsoft Questions",
  },
  {
    id: 5,
    Icon: <PlusIcon/>,
    name: "Plus",
  }
]

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [tags, setTags] = useState([]);
  const [currentDataList, setCurrentDataList] = useState<problemListI[]>([]);
  
  const {tags :tagsList} = useContext(Context)
  const problemList = useSelector((state: any) => state.problemList);
  
  useEffect(() => {
    function getData() {
      if(tags.length === 0 && difficulty.length === 0 && searchQuery.length === 0){
        setCurrentDataList(problemList);
      }
    }
    getData();
  }, [problemList, tags, searchQuery, difficulty]);

  const fetchFilteredData = async (searchQuery = '') => {
    const {data} = await filterProblemData.post<problemListI[]>("/", {
      keyword: searchQuery,
      tags: tags,
      difficulty: difficulty,
    });
    setCurrentDataList(data)
  }
  
  useEffect(() => {
    if(tags.length > 0 || difficulty.length > 0 || searchQuery.length > 0){
      fetchFilteredData()
    }
  }, [tags, difficulty, searchQuery])
  
  const _debounceSearchField = useCallback(debounce(fetchFilteredData, 500), [])

  const onSearchQueryChange = e => {
    setSearchQuery(e.target.value);
    _debounceSearchField(e.target.value);
  };

  return (
    <WrapperLayout>
      <motion.div animate={{ y: [20, 0, 0] }}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-10 ">
          {companyData.map(company => (
            <CompanyTags key={company.id} Icon={company.Icon} title={company.name} />
          ))}
        </div>
      </motion.div>
      <br />
      <hr />
      <br />

      <MultiSelect
      // @ts-ignore
      data={tagsList}
      className="w-full md:w-1/2"
        placeholder="Select Tags"
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
          value={searchQuery}
          onChange={onSearchQueryChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-[13px] text-[#C1C2C5] font-semibold tracking-wider">Select Difficulty</label>
    <CheckboxGroup description="You can select multiple" defaultValue={[]} onChange={(e) => setDifficulty(e)}>
      <Checkbox value="E" label="Easy" />
      <Checkbox value="M" label="Medium" />
      <Checkbox value="H" label="Hard" />
    </CheckboxGroup>

        <div className="flex flex-col">
        <Table dataList={currentDataList} />
        </div>
      </div>
    </WrapperLayout>
  );
}

export default Problem;