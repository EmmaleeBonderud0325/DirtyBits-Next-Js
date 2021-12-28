import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Head from "next/head";

import Problem from "../components/Problem";

import { getProblems, updateProblemList } from "../redux/actions";
import Cookies from "js-cookie";

function practice(props) {
  useEffect(() => {
    const refresh = Cookies.get("refresh");
    const isLoggedin = false;
    if (refresh) {
      isLoggedin = true;
    }
    props.getProblems(isLoggedin);
  }, []);
  return (
    <>
      <Head>
        <title>Practice</title>
      </Head>
      <Problem />
    </>
  );
}

const mapStateToprops = (state) => {
  return {
    problemList: state.problemList,
  };
};

export default connect(mapStateToprops, { getProblems })(practice);
