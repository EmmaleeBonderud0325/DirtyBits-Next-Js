import { useState } from "react";
import axios from "axios";

import { Page1 } from "../components/AddProblemComponents/Page1";
import { Page2 } from "../components/AddProblemComponents/Page2";

function addproblems(props) {
  let [step, setStep] = useState(1);
  let [probId, setProbId] = useState(null);
  return (
    <div>
      {step === 1 ? (
        <Page1
          stepFunction={setStep}
          probIdFunction={setProbId}
          tags={props.tags}
        />
      ) : (
        <Page2 stepFunction={setStep} problemId={probId} />
      )}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const response = await axios.get(
    "https://db-code.herokuapp.com/problems/getTagListCreateProblem/"
  );
  const parseData = response.data.results;
  let colourOptions = [];
  for (const data in parseData) {
    let tempData = {};
    tempData["value"] = parseData[data].id;
    tempData["label"] = parseData[data].name;
    tempData["color"] = "#4C0F89";
    colourOptions.push(tempData);
  }
  return {
    props: {
      tags: colourOptions,
    },
  };
};

export default addproblems;
