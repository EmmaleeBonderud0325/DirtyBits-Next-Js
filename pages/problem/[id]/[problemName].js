import Head from "next/head";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import {
  changeProblemPageProblemId,
  getProblemPageProblemData,
} from "../../../redux/actions/ProblemPage";
import Panel2 from "../../../components/ProblemPage/Panel2";

function ProblemView({ title }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let path = window.location.href;
    path = path.split("/");
    const id = path.at(-2);
    dispatch(changeProblemPageProblemId(id));
    dispatch(getProblemPageProblemData(id));
  }, []);

  return (
    <div className="text-white">
      <Head>
        <title>{title ? title : "Loading..."}</title>
      </Head>
      <div>
        <Panel2 />
      </div>
    </div>
  );
}

ProblemView.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

const mapStateToProps = (state) => {
  return {
    title: state.problemData.title,
  };
};

export default connect(mapStateToProps)(ProblemView);
