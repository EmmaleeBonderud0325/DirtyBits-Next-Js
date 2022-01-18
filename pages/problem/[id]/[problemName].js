import Head from "next/head";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import {
  changeProblemPageProblemId,
  getProblemPageProblemData,
} from "../../../redux/actions/ProblemPage";
import Panel2 from "../../../components/ProblemPage/Panel2";

function ProblemView({ id, title }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeProblemPageProblemId(id));
    dispatch(getProblemPageProblemData(id));
  }, []);

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

const mapStateToProps = (state) => {
  return {
    title: state.problemData.title,
  };
};

export default connect(mapStateToProps)(ProblemView);

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.query.id,
    },
  };
};
