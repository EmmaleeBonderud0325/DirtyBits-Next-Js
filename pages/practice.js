import React from "react";
import Head from "next/head";

import Problem from "../components/Problem";
import {getProblemsList} from '../components/api/apis'

function practice({problemList}) {
  return (
    <>
      <Head>
        <title>Practice</title>
      </Head>
      <Problem problemList={problemList}/>
    </>
  );
}

export const getServerSideProps = async(ctx) => {
  const {req, res} = ctx
  const response = await getProblemsList.post('/', {
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + req.cookies.access,
    },
  })
  return {
    props: {
      problemList: response.data
    }
  }
}


export default practice;
