// import axios from 'axios';
import Panel2 from "../../../components/ProblemPage/Panel2";
import { getProblem } from "../../../components/api/apis";
import Head from "next/head";

function ProblemView({ data, id }) {
  console.log("data", data);
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
  console.log("ctx", ctx.params);
  console.log("query", ctx.query);
  console.log("id", ctx.query.id);
  const { data } = await getProblem.get(`/${ctx.query.id}/`);

  console.log(data);

  return {
    props: {
      data,
      id: ctx.query.id,
    },
  };
};
