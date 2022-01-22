import {
  UpdateEditorValue,
  UpdateEditorTheme,
  UpdateEditorLanguage,
  UpdateEditorFontSize,
  UpdateProblemPageProblemId,
  UpdateProblemPageProblemData,
  UpdateIsUpvoted,
  UpdateIsDownvoted,
  UpdateUpvotes,
  UpdateDownvotes,
  UpdateSubmissionCount,
  UpdateIsBookmarked,
  UpdateSubmissionsList,
  UpdateGetSubmissionsState,
  AppendSubmissionList,
  UpdateInputTestCases,
  UpdateOutputTestCases,
} from "../types";
import {
  getProblem,
  getSavedCode,
  getProblemPageDataApi,
  getSubmissionsList,
  handleBookmark,
  upAndDownVoteHandler,
} from "../../components/api/apis";
import { initial } from "../reducers/ProblemPageReducers/ProblemDataReducer";
const jsonData = require("../../components/ProblemPage/data.json");

export const changeEditorValue = (newState) => {
  return {
    type: UpdateEditorValue,
    payload: newState,
  };
};

export const changeTheme = (newState) => {
  return {
    type: UpdateEditorTheme,
    payload: newState,
  };
};

export const changeLanguage = (newState) => {
  return {
    type: UpdateEditorLanguage,
    payload: newState,
  };
};

export const changeFont = (newState) => {
  return {
    type: UpdateEditorFontSize,
    payload: newState,
  };
};

export const changeProblemData = (newState) => {
  return {
    type: UpdateProblemPageProblemData,
    payload: newState,
  };
};

export const changeIsUpvoted = (newState) => {
  return {
    type: UpdateIsUpvoted,
    payload: newState,
  };
};

export const changeIsDownvoted = (newState) => {
  return {
    type: UpdateIsDownvoted,
    payload: newState,
  };
};

export const changeUpvotes = (newState) => {
  return {
    type: UpdateUpvotes,
    payload: newState,
  };
};

export const changeDownvotes = (newState) => {
  return {
    type: UpdateDownvotes,
    payload: newState,
  };
};

export const changeSubmissionCount = (newState) => {
  return {
    type: UpdateSubmissionCount,
    payload: newState,
  };
};

export const changeIsBookmarked = (newState) => {
  return {
    type: UpdateIsBookmarked,
    payload: newState,
  };
};

export const bookmarkStatusHandler = () => async (dispatch, getState) => {
  console.log("called");
  try {
    dispatch(changeIsBookmarked(!getState().isBookmarked));
    handleBookmark.post("/", {
      problem_id: Number(getState().problemPageProblemId),
    });
  } catch (err) {
    console.log("Token Error");
  }
};

export const upvoteHandler = () => async (dispatch, getState) => {
  let flag = false;
  if (getState().isDownvoted) {
    dispatch(changeDownvotes(getState().downvoteCount - 1));
    dispatch(changeIsDownvoted(!getState().isDownvoted));
    flag = true;
  }
  getState().isUpvoted
    ? dispatch(changeUpvotes(getState().upvoteCount - 1))
    : dispatch(changeUpvotes(getState().upvoteCount + 1));
  dispatch(changeIsUpvoted(!getState().isUpvoted));
  try {
    if (flag) {
      await upAndDownVoteHandler.post("/", {
        data: {
          problem_id: Number(getState().problemPageProblemId),
          type: "UpvoteDownvote",
        },
      });
    } else {
      await upAndDownVoteHandler.post("/", {
        data: {
          problem_id: Number(getState().problemPageProblemId),
          type: "upvote",
        },
      });
    }
  } catch (e) {
    console.error("Token Error");
  }
};

export const downvoteHandler = () => async (dispatch, getState) => {
  let flag = false;
  if (getState().isUpvoted) {
    dispatch(changeUpvotes(getState().upvoteCount - 1));
    dispatch(changeIsUpvoted(!getState().isUpvoted));
    flag = true;
  }
  getState().isDownvoted
    ? dispatch(changeDownvotes(getState().downvoteCount - 1))
    : dispatch(changeDownvotes(getState().downvoteCount + 1));
  dispatch(changeIsDownvoted(!getState().isDownvoted));
  try {
    if (flag) {
      await upAndDownVoteHandler.post("/", {
        data: {
          problem_id: Number(getState().problemPageProblemId),
          type: "UpvoteDownvote",
        },
      });
    } else {
      await upAndDownVoteHandler.post("/", {
        data: {
          problem_id: Number(getState().problemPageProblemId),
          type: "downvote",
        },
      });
    }
  } catch (e) {
    console.error("Token Error");
  }
};

export const changeInputTestCases = (newState) => {
  return {
    type: UpdateInputTestCases,
    payload: newState,
  };
};

export const changeOutputTestCases = (newState) => {
  return {
    type: UpdateOutputTestCases,
    payload: newState,
  };
};

export const getInputTestCases = (id) => async (dispatch, getState) => {
  var inputTestCases = [];
  for (let i = 1; i <= getState().problemData.sample_Tc; i++) {
    const result = fetch(
      `https://res.cloudinary.com/hhikcz56h/raw/upload/v1636969572/TestCases/${id}/sc-input${i}.txt`
    ).then((response) => {
      return response.text();
    });
    await result.then((response) => {
      inputTestCases.push(response);
    });
  }
  dispatch(changeInputTestCases(inputTestCases));
};

export const getOutputTestCases = (id) => async (dispatch, getState) => {
  var outputTestCases = [];
  for (let i = 1; i <= getState().problemData.sample_Tc; i++) {
    const result = fetch(
      `https://res.cloudinary.com/hhikcz56h/raw/upload/v1636969572/TestCases/${id}/sc-output${i}.txt`
    ).then((response) => {
      return response.text();
    });
    await result.then((response) => {
      outputTestCases.push(response);
    });
  }
  dispatch(changeOutputTestCases(outputTestCases));
};

export const getProblemPageProblemData = (id) => async (dispatch, getState) => {
  try {
    const { data } = await getProblem.get(`/${id}/`);
    dispatch(changeProblemData(data));
    dispatch(changeUpvotes(data.up_votes));
    dispatch(changeDownvotes(data.down_votes));
    if (getState().userData.is_logged_in) {
      const res = await getSavedCode.get(`/${id}/`);
      console.log("result", res.data);
      if (res.data.length > 0) {
        dispatch(changeEditorValue(res.data[0].code));
        const currLang = getState().editorLanguage;
        for (let i = 0; i < jsonData.language.length; i++) {
          if (jsonData.language[i].label === res.data[0].language) {
            dispatch(
              changeLanguage({
                currLang,
                value: jsonData.language[i].value,
                label: jsonData.language[i].label,
                ext: jsonData.language[i].ext,
                icon: jsonData.language[i].icon,
              })
            );
            break;
          }
        }
      }
      dispatch(getInputTestCases(id));
      dispatch(getOutputTestCases(id));
      const problemData = await getProblemPageDataApi.get(`/${id}/`);
      dispatch(changeIsUpvoted(problemData.data.upvote));
      dispatch(changeIsDownvoted(problemData.data.downvote));
      dispatch(changeSubmissionCount(problemData.data.submissions));
      dispatch(changeIsBookmarked(problemData.data.bookmarked));
    }
  } catch (err) {
    console.error("error");
  }
};

export const changeSubmissionsList = (newState) => {
  return {
    type: UpdateSubmissionsList,
    payload: newState,
  };
};

export const changeGetSubmissionsListAppendData = (newState) => {
  console.log(newState);
  return {
    type: AppendSubmissionList,
    payload: newState,
  };
};

export const changeGetSubmissionsList = (newState) => {
  return {
    type: UpdateGetSubmissionsState,
    payload: newState,
  };
};

export const getSubmissionsListAction = () => async (dispatch, getState) => {
  try {
    if (getState().userData.is_logged_in && getState().getSubmissionsState) {
      const response = await getSubmissionsList.get(
        `/${getState().problemPageProblemId}/`
      );
      dispatch(changeSubmissionsList(response.data));
      dispatch(changeGetSubmissionsList(false));
    }
  } catch (err) {
    console.error("Token Error");
  }
};

export const changeProblemPageProblemId = (newState) => {
  return {
    type: UpdateProblemPageProblemId,
    payload: newState,
  };
};

export const unMountEditorPage = () => (dispatch, _) => {
  dispatch(changeGetSubmissionsList(true));
  dispatch(changeSubmissionsList(null));
  dispatch(changeProblemData(initial));
  dispatch(changeInputTestCases([]));
  dispatch(changeOutputTestCases([]));
};
