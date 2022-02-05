import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getTags } from "../redux/actions/index";
import New from "../components/AddProblemComponents/New";

function Addproblems() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <div>
      <New tagsValue={tags} />
    </div>
  );
}

export default Addproblems;
