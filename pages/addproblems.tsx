import { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getTags } from "../redux/actions/index";
import New from "../components/AddProblemComponents/New";
import { IRootState } from "../redux/reducers";

function Addproblems(): ReactElement {
  const dispatch = useDispatch();
  // const tags = useSelector((state: IRootState) => state.tags);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <div>
      {/* <New tagsValue={tags} /> */}
      <New />
    </div>
  );
}

export default Addproblems;
