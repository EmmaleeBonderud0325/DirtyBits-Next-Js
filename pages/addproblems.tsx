import { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getTags } from "../redux/actions/index";
import New from "../components/AddProblemComponents/New";

function Addproblems(): ReactElement {
  return (
    <div>
      <New />
    </div>
  );
}

export default Addproblems;
