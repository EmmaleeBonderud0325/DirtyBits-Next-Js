import { ReactElement, useCallback, useContext, useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedValue } from "@mantine/hooks";

import StyledContainer from 'Layout/Layout'
import {GoogleIcon, FacebookIcon, AmazonIcon, MicrosoftIcon, PlusIcon} from 'SVG'
import { getProblems, updateProblemList } from "redux/actions";
import { problemListI } from "redux/interfaces";
import CompanyTags from "components/CompanyTags/CompanyTags";
import Table from "components/Table";
import { filterProblemData } from "components/api/apis";
import Checkbox from 'components/Checkbox'
import MultiSelect from "components/MultiSelect"
import Divider from "components/Divider"
import { Context } from "Context";
import SearchInput from 'components/InputField'


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
  const {tags :tagsList} = useContext(Context)
  const problemList = useSelector((state: any) => state.problemList);
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [tags, setTags] = useState([]);

  const [debounced] = useDebouncedValue(searchQuery, 500);
  
  useEffect(() => {
    function getData() {
      if(tags.length === 0 && difficulty.length === 0 && searchQuery.length === 0){
        dispatch(getProblems())
      }
    }
    getData();
  }, [tags, searchQuery, difficulty, dispatch]);

  const filteredData = useCallback( async (debounced: string) => {
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
  

  // const onSearchQueryChange = e => {
  //   setSearchQuery(e.target.value);
  // };

  return (
    <StyledContainer className="space-y-10 mt-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-10 mb-10">
        {companyData.map(company => (
            <CompanyTags key={company.id} Icon={company.Icon} title={company.name} />
        ))}
      </div>
      <Divider/>     
      <MultiSelect
        tagsList={tagsList}
        setTags={setTags}
      />
      {/* SEARCH BAR */}
      <div className="space-x-3 w-full block">
        <SearchInput searchQuery={searchQuery} onSearchQueryChange={setSearchQuery}/>
      </div>
      <Checkbox setDifficulty={setDifficulty}/>
      <div className="flex flex-col">
        <Table dataList={problemList} />
      </div>
    </StyledContainer>
  );
}

export default Problem;