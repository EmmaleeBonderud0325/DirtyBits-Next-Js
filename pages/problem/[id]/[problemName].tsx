import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import {
  changeProblemPageProblemId,
  getProblemPageProblemData,
} from "redux/actions/ProblemPage";
import Panel2 from "components/ProblemPage/Panel2";
import { IRootState } from "redux/reducers";

function ProblemView({ title }): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    let path = window.location.href.split("/");
    const id = Number(path.at(-2));
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

ProblemView.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};

const mapStateToProps = (state: IRootState) => {
  return {
    title: state.problemData.title,
  };
};

export default connect(mapStateToProps)(ProblemView);
