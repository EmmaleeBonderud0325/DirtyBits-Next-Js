import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Head from "next/head";

import Problem from "../components/Problem";

import { getProblems, updateProblemList } from "../redux/actions";

function practice(props) {
  let [problemList, setProblemList] = useState([]);
  useEffect(() => {
    props.getProblems();
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
