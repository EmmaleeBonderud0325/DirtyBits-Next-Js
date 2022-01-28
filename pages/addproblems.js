import { useState, useEffect } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";

import { Page1 } from "../components/AddProblemComponents/Page1";
import { Page2 } from "../components/AddProblemComponents/Page2";
import { getTags } from "../redux/actions/index";
import { useDispatch } from "react-redux";
import New from "../components/AddProblemComponents/New";

function addproblems(props) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);
  // let [step, setStep] = useState(1);
  let [probId, setProbId] = useState(null);

  useEffect(() => {
    console.log("inside usef");
    dispatch(getTags());
    console.log("tags", tags);
  }, []);

  return (
    <div>
      {/* {step === 1 ? (
        <Page1 stepFunction={setStep} probIdFunction={setProbId} tags={tags} />
      ) : (
        <Page2 stepFunction={setStep} problemId={probId} />
      )} */}
      <New tagsValue={tags} />
    </div>
  );
}

export default addproblems;
