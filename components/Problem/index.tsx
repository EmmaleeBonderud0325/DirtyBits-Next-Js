import { ReactElement, useCallback, useContext, useEffect, useState, } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Input} from '@mantine/core';
import Checkbox from '../Checkbox'

import Table from "../Table";
import {GoogleIcon, FacebookIcon, AmazonIcon, MicrosoftIcon, PlusIcon} from '../../SVG'
import CompanyTags from "../CompanyTags/CompanyTags";
import { filterProblemData } from "../api/apis";
import WrapperLayout from "../../Layout/Layout";
import { problemListI } from "../../redux/interfaces";
import { Context } from "../../Context";
import Fade from 'react-reveal/Fade';
import { getProblems, updateProblemList } from "redux/actions";
import { useDebouncedValue } from "@mantine/hooks";
import MultiSelect from '../MultiSelect'
import Divider from '../Divider'


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

function Problem(props): ReactElement {
  const dispatch = useDispatch()
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [tags, setTags] = useState([]);
  // const [currentDataList, setCurrentDataList] = useState<problemListI[]>([]);
  const {tags :tagsList} = useContext(Context)
  const problemList = useSelector((state: any) => state.problemList);

  const [debounced] = useDebouncedValue(searchQuery, 500);
  
  useEffect(() => {
    function getData() {
      if(tags.length === 0 && difficulty.length === 0 && searchQuery.length === 0){
        dispatch(getProblems())
      }
    }
    getData();
  }, [tags, searchQuery, difficulty, dispatch]);

  const filteredData = useCallback( async (debounced) => {
      const {data} = await filterProblemData.post<problemListI[]>("/", {
        keyword: debounced,
        tags: tags,
        difficulty: difficulty,
      });
      dispatch(updateProblemList(data))
  }, [tags, difficulty, dispatch])

  
  useEffect(() => {
    if(tags.length > 0 || difficulty.length > 0 || searchQuery.length > 0){
      filteredData(debounced)
    }
  }, [tags, difficulty, debounced, filteredData])
  
  // const _debounceSearchField = useCallback(debounce(fetchFilteredData, 500), [searchQuery, tags, difficulty])

  const onSearchQueryChange = e => {
    setSearchQuery(e.target.value);
    // _debounceSearchField(e.target.value);
  };

  return (
    <WrapperLayout>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-10 mb-10">
          {companyData.map(company => (
            <Fade bottom key={company.id}>
              <CompanyTags Icon={company.Icon} title={company.name} />
            </Fade>
          ))}
        </div>
      <Divider/>     
      <MultiSelect
        tagsList={tagsList}
        setTags={setTags}
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
          <Checkbox setDifficulty={setDifficulty}/>
      <div className="flex flex-col">
    <Table dataList={problemList} />
    </div>
    </WrapperLayout>
  );
}

export default Problem;