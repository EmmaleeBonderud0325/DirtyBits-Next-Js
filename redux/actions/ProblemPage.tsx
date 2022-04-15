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
import {
  DispatchI,
  editorLanguageI,
  GetStateI,
  problemDataI,
  ProblemPageDataI,
  SavedCodeI,
  submissionsListI,
  themeI,
} from "../interfaces";
const jsonData = require("../../components/ProblemPage/data.json");

interface changeEditorValueI {
  type: string;
  payload: string;
}
export const changeEditorValue = (newState: string): changeEditorValueI => {
  return {
    type: UpdateEditorValue,
    payload: newState,
  };
};

interface changeThemeI {
  type: string;
  payload: themeI;
}
export const changeTheme = (newState: themeI): changeThemeI => {
  return {
    type: UpdateEditorTheme,
    payload: newState,
  };
};

interface changeLanguageI {
  type: string;
  payload: editorLanguageI;
}
export const changeLanguage = (newState: editorLanguageI): changeLanguageI => {
  return {
    type: UpdateEditorLanguage,
    payload: newState,
  };
};

interface changeFontI {
  type: string;
  payload: number;
}
export const changeFont = (newState: number): changeFontI => {
  return {
    type: UpdateEditorFontSize,
    payload: newState,
  };
};

interface changeProblemDataI {
  type: string;
  payload: problemDataI;
}
export const changeProblemData = (
  newState: problemDataI
): changeProblemDataI => {
  return {
    type: UpdateProblemPageProblemData,
    payload: newState,
  };
};

interface changeIsUpvotedI {
  type: string;
  payload: boolean;
}
export const changeIsUpvoted = (newState: boolean): changeIsUpvotedI => {
  return {
    type: UpdateIsUpvoted,
    payload: newState,
  };
};

interface changeIsDownvotedI {
  type: string;
  payload: boolean;
}
export const changeIsDownvoted = (newState: boolean): changeIsDownvotedI => {
  return {
    type: UpdateIsDownvoted,
    payload: newState,
  };
};

interface changeUpvotesI {
  type: string;
  payload: number;
}
export const changeUpvotes = (newState: number): changeUpvotesI => {
  return {
    type: UpdateUpvotes,
    payload: newState,
  };
};

interface changeDownvotesI {
  type: string;
  payload: number;
}
export const changeDownvotes = (newState: number): changeDownvotesI => {
  return {
    type: UpdateDownvotes,
    payload: newState,
  };
};

interface changeSubmissionCountI {
  type: string;
  payload: number;
}
export const changeSubmissionCount = (
  newState: number
): changeSubmissionCountI => {
  return {
    type: UpdateSubmissionCount,
    payload: newState,
  };
};

interface changeIsBookmarkedI {
  type: string;
  payload: boolean;
}
export const changeIsBookmarked = (newState: boolean): changeIsBookmarkedI => {
  return {
    type: UpdateIsBookmarked,
    payload: newState,
  };
};

export const bookmarkStatusHandler =
  () => async (dispatch: DispatchI, getState: GetStateI) => {
    try {
      dispatch(changeIsBookmarked(!getState().isBookmarked));
      await handleBookmark.post("/", {
        problem_id: getState().problemPageProblemId,
      });
    } catch (err) {
      console.log("Token Error");
    }
  };

export const upvoteHandler =
  () => async (dispatch: DispatchI, getState: GetStateI) => {
    let flag: boolean = false;
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
            problem_id: getState().problemPageProblemId,
            type: "UpvoteDownvote",
          },
        });
      } else {
        await upAndDownVoteHandler.post("/", {
          data: {
            problem_id: getState().problemPageProblemId,
            type: "upvote",
          },
        });
      }
    } catch (e) {
      console.error("Token Error");
    }
  };

export const downvoteHandler =
  () => async (dispatch: DispatchI, getState: GetStateI) => {
    let flag: boolean = false;
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
            problem_id: getState().problemPageProblemId,
            type: "UpvoteDownvote",
          },
        });
      } else {
        await upAndDownVoteHandler.post("/", {
          data: {
            problem_id: getState().problemPageProblemId,
            type: "downvote",
          },
        });
      }
    } catch (e) {
      console.error("Token Error");
    }
  };

interface changeInputTestCasesI {
  type: string;
  payload: string[];
}
export const changeInputTestCases = (
  newState: string[]
): changeInputTestCasesI => {
  return {
    type: UpdateInputTestCases,
    payload: newState,
  };
};

interface changeOutputTestCasesI {
  type: string;
  payload: string[];
}
export const changeOutputTestCases = (
  newState: string[]
): changeOutputTestCasesI => {
  return {
    type: UpdateOutputTestCases,
    payload: newState,
  };
};

export const getInputTestCases =
  (id: number) => async (dispatch: DispatchI, getState: GetStateI) => {
    var inputTestCases: string[] = [];
    for (let i = 1; i <= getState().problemData.sample_Tc; i++) {
      const result = fetch(
        `${process.env.NEXT_PUBLIC_TEST_CASES}${id}/sc-input${i}.txt`
      ).then((response) => {
        return response.text();
      });
      await result.then((response) => {
        inputTestCases.push(response);
      });
    }
    dispatch(changeInputTestCases(inputTestCases));
  };

export const getOutputTestCases =
  (id: number) => async (dispatch: DispatchI, getState: GetStateI) => {
    var outputTestCases: string[] = [];
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

export const getProblemPageProblemData =
  (id: number) => async (dispatch: DispatchI, getState: GetStateI) => {
    try {
      const { data } = await getProblem.get<problemDataI>(`/${id}/`);
      dispatch(changeProblemData(data));
      dispatch(changeUpvotes(data.up_votes));
      dispatch(changeDownvotes(data.down_votes));
      if (getState().userData.is_logged_in) {
        const res = await getSavedCode.get<SavedCodeI[]>(`/${id}/`);
        if (res.data.length > 0) {
          dispatch(changeEditorValue(res.data[0].code));
          const currLang = getState().editorLanguage;
          for (let i = 0; i < jsonData.language.length; i++) {
            if (jsonData.language[i].label === res.data[0].language) {
              dispatch(
                changeLanguage({
                  ...currLang,
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
        dispatch(getInputTestCases(id) as any);
        dispatch(getOutputTestCases(id) as any);
        const problemData = await getProblemPageDataApi.get<ProblemPageDataI>(
          `/${id}/`
        );
        dispatch(changeIsUpvoted(problemData.data.upvote));
        dispatch(changeIsDownvoted(problemData.data.downvote));
        dispatch(changeSubmissionCount(problemData.data.submissions));
        dispatch(changeIsBookmarked(problemData.data.bookmarked));
      }
    } catch (err) {
      console.error("error");
    }
  };

interface changeSubmissionsListI {
  type: string;
  payload: submissionsListI[];
}
export const changeSubmissionsList = (
  newState: submissionsListI[]
): changeSubmissionsListI => {
  return {
    type: UpdateSubmissionsList,
    payload: newState,
  };
};

interface changeGetSubmissionsListAppendDataI {
  type: string;
  payload: submissionsListI;
}
export const changeGetSubmissionsListAppendData = (
  newState: submissionsListI
): changeGetSubmissionsListAppendDataI => {
  console.log(newState);
  return {
    type: AppendSubmissionList,
    payload: newState,
  };
};

interface changeGetSubmissionsListI {
  type: string;
  payload: boolean;
}
export const changeGetSubmissionsList = (
  newState: boolean
): changeGetSubmissionsListI => {
  return {
    type: UpdateGetSubmissionsState,
    payload: newState,
  };
};

export const getSubmissionsListAction =
  () => async (dispatch: DispatchI, getState: GetStateI) => {
    try {
      if (getState().userData.is_logged_in && getState().getSubmissionsState) {
        const response = await getSubmissionsList.get<submissionsListI[]>(
          `/${getState().problemPageProblemId}/`
        );
        dispatch(changeSubmissionsList(response.data));
        dispatch(changeGetSubmissionsList(false));
      }
    } catch (err) {
      console.error("Token Error");
    }
  };

interface changeProblemPageProblemIdI {
  type: string;
  payload: null | number;
}
export const changeProblemPageProblemId = (
  newState: null | number
): changeProblemPageProblemIdI => {
  return {
    type: UpdateProblemPageProblemId,
    payload: newState,
  };
};

export const unMountEditorPage = () => (dispatch: DispatchI, _: GetStateI) => {
  dispatch(changeGetSubmissionsList(true));
  dispatch(changeSubmissionsList(null));
  dispatch(changeProblemData(initial));
  dispatch(changeInputTestCases([]));
  dispatch(changeOutputTestCases([]));
};
