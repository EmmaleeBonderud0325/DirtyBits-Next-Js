import React, { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
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
  console.log("Ok");
  let refresh_token = Cookies.get("refresh");
  console.log(refresh_token);
  if (refresh_token) {
    console.log("Here");
    await Gettoken(Cookies.get("refresh"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT " + Cookies.get("access"),
    };
    console.log(headers);
    response = await getProblemsList.post(
      "/",
      { data: {} },
      {
        headers: headers,
      }
    );
  } else {
    console.log("There");
    response = await getProblemsList.post("/");
  }
  // console.log(response.data);
  return {
    props: {
      problemList: response.data,
    },
  };
};

export default practice;
