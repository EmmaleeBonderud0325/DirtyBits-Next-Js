import { ReactElement, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";

import Problem from "../components/Problem";
import { getProblems, getTags } from "../redux/actions";
import {Context} from '../Context'

function Practice(): ReactElement {
  const dispatch = useDispatch();
  const {tags} = useContext(Context)

  console.log('state', tags)
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
