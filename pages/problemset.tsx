import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";

import Problem from "components/Problem";


function Practice(): ReactElement {
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
