import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  changeProblemPageProblemId,
  getProblemPageProblemData,
} from "../../../redux/actions/ProblemPage";
import Panel2 from "../../../components/ProblemPage/Panel2";

function ProblemView({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeProblemPageProblemId(id));
    dispatch(getProblemPageProblemData(id));
  }, []);
  const title = useSelector((state) => state.problemData.title);
  return (
    <div className="text-white">
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Panel2 id={id} />
      </div>
    </div>
  );
}

ProblemView.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export default ProblemView;

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.query.id,
    },
  };
};
