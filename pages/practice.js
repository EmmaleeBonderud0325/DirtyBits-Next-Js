import React, { useEffect, useState } from "react";
import Head from "next/head";
import Gettoken from "../components/Helper/Gettoken";

import Problem from "../components/Problem";
import { getProblemsList } from "../components/api/apis";

function practice({ problemList }) {
  return (
    <>
      <Head>
        <title>Practice</title>
      </Head>
      <Problem problemList={problemList} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  let response;
  let refresh_token = req.cookies.refresh;
  if (refresh_token) {
    await Gettoken(req.cookies.refresh);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT " + req.cookies.access,
    };
    response = await getProblemsList.post(
      "/",
      { data: {} },
      {
        headers: headers,
      }
    );
  } else {
    response = await getProblemsList.post("/");
  }
  return {
    props: {
      problemList: response.data,
    },
  };
};

export default practice;
