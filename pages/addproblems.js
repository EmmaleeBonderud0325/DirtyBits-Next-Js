import { useState, useEffect } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";

import { Page1 } from "../components/AddProblemComponents/Page1";
import { Page2 } from "../components/AddProblemComponents/Page2";
import { getTags } from "../redux/actions/index";
import { useDispatch } from "react-redux";

function addproblems(props) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);
  let [step, setStep] = useState(1);
  let [probId, setProbId] = useState(null);

  useEffect(() => {
    console.log("inside usef");
    dispatch(getTags());
    console.log("tags", tags);
  }, []);

  return (
    <div>
      {step === 1 ? (
        <Page1 stepFunction={setStep} probIdFunction={setProbId} tags={tags} />
      ) : (
        <Page2 stepFunction={setStep} problemId={probId} />
      )}
    </div>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const response = await axios.get(
//     "https://db-code.herokuapp.com/problems/getTagListCreateProblem/"
//   );
//   const parseData = response.data.results;
//   let colourOptions = [];
//   for (const data in parseData) {
//     let tempData = {};
//     tempData["value"] = parseData[data].id;
//     tempData["label"] = parseData[data].name;
//     tempData["color"] = "#4C0F89";
//     colourOptions.push(tempData);
//   }
//   return {
//     props: {
//       tags: colourOptions,
//     },
//   };
// };

export default addproblems;
