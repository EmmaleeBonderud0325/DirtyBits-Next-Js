import ProblemTab from 'components/ProblemPage/ProblemTab';
import Tabs from 'components/ProblemPage/Tabs';
import React, { useEffect, useState } from 'react'
import SplitPane, { Pane } from "react-split-pane";
import { submissionResultI } from 'redux/interfaces';
import Head from 'next/head';
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic';
import useGetProblemData from 'hooks/useGetProblemData';

const Submissions = dynamic(() => import("components/ProblemPage/submission"))

function ProblemView({problemId}) {
  // const router = useRouter()
  // const problemId = Number(router.query.problemId)
  const [data, isLoading, isFetching, error] = useGetProblemData(problemId)
  const [tabsValue, setTabsValue] = useState<number>(0);
  const [resultData, setResultData] = useState<submissionResultI | {}>({});
  const [running, setIsRunning] = useState<boolean>(false);
    
  const tabsValueHandler = (value: number): void => {
    setTabsValue(value);
  };

  const submissionDataHandler = (value: submissionResultI | {}): void => {
    setResultData(value);
  };

  const runningHandler = (value: boolean): void => {
    setIsRunning(value);
  };

  let title: string;
  if(isFetching){
    title = "Loading..."
  }else if(data){
    title = data.title
  }
  
    
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SplitPane
        split="vertical"
        minSize={400}
        maxSize={1200}
        defaultSize={900}
        style={{ height: "100vh" }}
        className="scrollbar-hide"
      >
        <Pane
            className="scrollbar-hide"
            style={{ overflowY: "scroll", backgroundColor: '#111827' }}
            >
          <Tabs
            problemTab={<ProblemTab pId={problemId}/>}
            submissionTab={
              <Submissions
                isRunning={running}
                result={resultData}
                pId={problemId}
              />
            }
            currentTabValue={tabsValue}
            currentTabFunction={tabsValueHandler}
          />
        </Pane>
        <Pane
          className="scrollbar-hide"
          style={{ overflowY: "scroll", backgroundColor: '#111827' }}
        >
          <h2 className='text-white text-2xl'>Right Panel</h2>
        </Pane>
      </SplitPane>
    </>
  )
}

ProblemView.getLayout = function PageLayout(page: any) {
    return <>{page}</>;
};

export async function getServerSideProps(context) {
  const problemId = Number(context.query.problemId)
  return {
    props: {
      problemId
    },
  }
}

export default ProblemView