import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import {
  changeProblemPageProblemId,
  getProblemPageProblemData,
} from "redux/actions/ProblemPage";
import Panel2 from "components/ProblemPage/Panel2";
import { IRootState } from "redux/reducers";
import { getProblem, getSavedCode } from "components/api/apis";
import { problemDataI, SavedCodeI } from "redux/interfaces";

function ProblemView(): ReactElement {
  const dispatch = useDispatch();

  
  const [upvote, setUpvote] = useState<number>(0);
  const [problemData, setProblemData] = useState<problemDataI | {}>({});
  const [problemTitle, setProblemTitle] = useState<string>("Loading...");
  const [problemId, setProblemId] = useState<number>(null);
  
  useEffect(() => {
    let path = window.location.href.split("/");
    setProblemId(Number(path.at(-2)));
    // dispatch(changeProblemPageProblemId(id));
    // dispatch(getProblemPageProblemData(id));
  }, []);

  useEffect(() => {
    async function getProblemById(){
      try {
        const { data } = await getProblem.get<problemDataI>(`/${problemId}/`);
        // dispatch(changeProblemData(data));
        setUpvote(data.up_votes);
        // dispatch(changeDownvotes(data.down_votes));
      } catch (err) {
        console.error("error");
      }
    }
  })
  
  return (
    <div>
      <Head>
        <title>{title ? title : "Loading..."}</title>
      </Head>
      <div>
        <Panel2 title={title}/>
      </div>
    </div>
  );
}

ProblemView.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};


export default ProblemView;
