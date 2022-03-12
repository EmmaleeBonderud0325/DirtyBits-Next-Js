import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";

import Problem from "components/Problem";
import { getProblems } from "redux/actions";

function Practice(): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProblems());
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

export default Practice;
