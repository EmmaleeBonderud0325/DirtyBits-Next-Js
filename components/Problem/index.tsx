import { ReactElement, useCallback, useContext, useEffect, useState, } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { Input} from '@mantine/core';
import Checkbox from '../Checkbox'

import Table from "../Table";
import {GoogleIcon, FacebookIcon, AmazonIcon, MicrosoftIcon, PlusIcon} from '../../SVG'
import CompanyTags from "../CompanyTags/CompanyTags";
import WrapperLayout from "../../Layout/Layout";
import { Context } from "../../Context";
import Fade from 'react-reveal/Fade';
import { useDebouncedValue } from "@mantine/hooks";
import MultiSelect from '../MultiSelect'
import Divider from '../Divider'
import {useGetFilteredProblemSetMutation} from 'apis/problemSet'


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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [tags, setTags] = useState([]);
  const {tags :tagsList} = useContext(Context)

  const [debounced] = useDebouncedValue(searchQuery, 500);

  const [getFilteredData, { status, data: filteredDataList,  isLoading: filteredDatalistLoading }] = useGetFilteredProblemSetMutation();

  console.log('filteredDataList', filteredDataList)
  
  
  const isLoading =  filteredDatalistLoading;

  const filteredData = useCallback( async (debounced) => {
    getFilteredData({
      keyword: debounced,
      tags: tags,
      difficulty: difficulty,
    })
}, [getFilteredData, tags, difficulty])

  
  useEffect(() => {
    filteredData(debounced)
  }, [tags, difficulty, debounced, filteredData])
  

  const onSearchQueryChange = e => {
    setSearchQuery(e.target.value);
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
    <Table isLoading={isLoading} dataList={filteredDataList} />
    </div>
    </WrapperLayout>
  );
}

export default Problem;