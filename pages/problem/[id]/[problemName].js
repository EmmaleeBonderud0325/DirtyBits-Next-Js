import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { changeProblemPageProblemId } from "../../../redux/actions/ProblemPage";
import Panel2 from "../../../components/ProblemPage/Panel2";
import { getProblem } from "../../../components/api/apis";

function ProblemView({ data, id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeProblemPageProblemId(id));
  }, []);
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div>
        <Panel2 id={id} question={data} />
      </div>
    </>
  );
}

ProblemView.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export default ProblemView;

export const getServerSideProps = async (ctx) => {
  const { data } = await getProblem.get(`/${ctx.query.id}/`);

  return {
    props: {
      data,
      id: ctx.query.id,
    },
  };
};
