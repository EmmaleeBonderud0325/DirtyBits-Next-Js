import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";

import Problem from "../components/Problem";
import { getProblems } from "../redux/actions";
import Cookies from "js-cookie";

function practice() {
  const dispatch = useDispatch();
  useEffect(() => {
    const refresh = Cookies.get("refresh");
    const isLoggedin = false;
    if (refresh) {
      isLoggedin = true;
    }
    dispatch(getProblems(isLoggedin));
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

export default practice;
