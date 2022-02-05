import { getProblemsList } from "../../components/api/apis";
import {
  updateConstraints,
  updateNote,
  updateInputFormat,
  updateOutputFormat,
  updateLevel,
  updateStatement,
  updateTitle,
  updateUserData,
  updateTags,
  FirstNameError,
  LastNameError,
  UsernameError,
  EmailError,
  PasswordError,
  ConfirmPasswordError,
  UpdateProblemList,
  updateMemoryLimit,
  updateTimeLimit,
  GithubLoginSpinner,
  GoogleLoginSpinner,
  SimpleLoginSpinner,
  UpdateTags,
} from "../types";
import { Updateproblemsstatus } from "../../components/Helper/Updateproblemsstatus";
import { getTagsApi } from "../../components/api/apis";
import {
  DispatchI,
  GetStateI,
  problemListI,
  SUErrorI,
  tagsI,
  userDataI,
} from "../interfaces";

interface updateUserinfoI {
  type: string;
  payload: userDataI;
}
export const updateUserinfo = (newState: userDataI): updateUserinfoI => {
  return {
    type: updateUserData,
    payload: newState,
  };
};

interface updateSignInSpinnerI {
  type: string;
  payload: boolean;
}
export const updateSignInSpinner = (
  newState: boolean
): updateSignInSpinnerI => {
  return {
    type: SimpleLoginSpinner,
    payload: newState,
  };
};

interface updateGoogleSpinnerI {
  type: string;
  payload: boolean;
}
export const updateGoogleSpinner = (
  newState: boolean
): updateGoogleSpinnerI => {
  return {
    type: GoogleLoginSpinner,
    payload: newState,
  };
};

interface updateGithubSpinnerI {
  type: string;
  payload: boolean;
}
export const updateGithubSpinner = (
  newState: boolean
): updateGithubSpinnerI => {
  return {
    type: GithubLoginSpinner,
    payload: newState,
  };
};

interface updateProblemTitleI {
  type: string;
  payload: string;
}
export const updateProblemTitle = (newState: string): updateProblemTitleI => {
  return {
    type: updateTitle,
    payload: newState,
  };
};

interface updateProblemNoteI {
  type: string;
  payload: string;
}
export const updateProblemNote = (newState: string): updateProblemNoteI => {
  return {
    type: updateNote,
    payload: newState,
  };
};

interface updateProblemStatementI {
  type: string;
  payload: string;
}
export const updateProblemStatement = (
  newState: string
): updateProblemStatementI => {
  return {
    type: updateStatement,
    payload: newState,
  };
};

interface updateProblemInputFormatI {
  type: string;
  payload: string;
}
export const updateProblemInputFormat = (
  newState: string
): updateProblemInputFormatI => {
  return {
    type: updateInputFormat,
    payload: newState,
  };
};

interface updateProblemContraintsI {
  type: string;
  payload: string;
}
export const updateProblemContraints = (
  newState: string
): updateProblemContraintsI => {
  return {
    type: updateConstraints,
    payload: newState,
  };
};

interface updateProblemOutputFormatI {
  type: string;
  payload: string;
}
export const updateProblemOutputFormat = (
  newState: string
): updateProblemOutputFormatI => {
  return {
    type: updateOutputFormat,
    payload: newState,
  };
};

interface updateProblemLevelI {
  type: string;
  payload: string;
}
export const updateProblemLevel = (newState: string): updateProblemLevelI => {
  const mapping = {
    Easy: "E",
    Medium: "M",
    Hard: "H",
  };
  return {
    type: updateLevel,
    payload: mapping[newState],
  };
};

interface updateProblemTagsI {
  type: string;
  payload: number[];
}
export const updateProblemTags = (newState: number[]): updateProblemTagsI => {
  return {
    type: updateTags,
    payload: newState,
  };
};

interface updateProblemMemoryLimitI {
  type: string;
  payload: null | number;
}
export const updateProblemMemoryLimit = (
  newState: null | number
): updateProblemMemoryLimitI => {
  return {
    type: updateMemoryLimit,
    payload: newState,
  };
};

interface updateProblemTimeLimitI {
  type: string;
  payload: null | number;
}
export const updateProblemTimeLimit = (
  newState: null | number
): updateProblemTimeLimitI => {
  return {
    type: updateTimeLimit,
    payload: newState,
  };
};

interface updateFirstNameErrorI {
  type: string;
  payload: SUErrorI;
}
export const updateFirstNameError = (
  newState: SUErrorI
): updateFirstNameErrorI => {
  return {
    type: FirstNameError,
    payload: newState,
  };
};

interface updateLastNameErrorI {
  type: string;
  payload: SUErrorI;
}
export const updateLastNameError = (
  newState: SUErrorI
): updateLastNameErrorI => {
  return {
    type: LastNameError,
    payload: newState,
  };
};

interface updateUsernameErrorI {
  type: string;
  payload: SUErrorI;
}
export const updateUsernameError = (
  newState: SUErrorI
): updateUsernameErrorI => {
  return {
    type: UsernameError,
    payload: newState,
  };
};

interface updateEmailErrorI {
  type: string;
  payload: SUErrorI;
}
export const updateEmailError = (newState: SUErrorI): updateEmailErrorI => {
  return {
    type: EmailError,
    payload: newState,
  };
};

interface updatePasswordErrorI {
  type: string;
  payload: SUErrorI;
}
export const updatePasswordError = (
  newState: SUErrorI
): updatePasswordErrorI => {
  return {
    type: PasswordError,
    payload: newState,
  };
};

interface updateConfirmPasswordErrorI {
  type: string;
  payload: SUErrorI;
}
export const updateConfirmPasswordError = (
  newState: SUErrorI
): updateConfirmPasswordErrorI => {
  return {
    type: ConfirmPasswordError,
    payload: newState,
  };
};

interface updateProblemListI {
  type: string;
  payload: problemListI[];
}
export const updateProblemList = (
  newState: problemListI[]
): updateProblemListI => {
  return {
    type: UpdateProblemList,
    payload: newState,
  };
};

interface getLatestTagsListI {
  type: string;
  payload: tagsI[];
}
export const getLatestTagsList = (newState: tagsI[]): getLatestTagsListI => {
  return {
    type: UpdateTags,
    payload: newState,
  };
};

export const updateProblemsStatus =
  () => async (dispatch: DispatchI, getState: GetStateI) => {
    const data = await Updateproblemsstatus(getState().problemList);
    dispatch(updateProblemList(data));
  };

export const getProblems =
  () => async (dispatch: DispatchI, getState: GetStateI) => {
    try {
      const result = await getProblemsList.get<problemListI[]>("/");
      dispatch(updateProblemList(result.data));
      if (getState().userData.is_logged_in) {
        dispatch(updateProblemsStatus() as any);
      }
    } catch {
      console.error("Server Error in Problems List Fetching");
    }
  };

interface CreateProblemTagI {
  id: number;
  name: string;
  value: number;
}
interface getTagsCreateProblemI {
  success: boolean;
  results: CreateProblemTagI[];
}
export const getTags = () => async (dispatch: DispatchI, _: GetStateI) => {
  try {
    const response = await getTagsApi.get<getTagsCreateProblemI>("/");
    const parseData = response.data.results;
    let colourOptions: tagsI[] = [];
    for (const data in parseData) {
      let tempData: tagsI = { value: null, label: "", color: "" };
      tempData["value"] = parseData[data].id;
      tempData["label"] = parseData[data].name;
      tempData["color"] = "#4C0F89";
      colourOptions.push(tempData);
    }
    dispatch(getLatestTagsList(colourOptions));
  } catch (err) {
    console.error(err.message);
  }
};

export const resetProblemPageData =
  () => async (dispatch: DispatchI, _: GetStateI) => {
    dispatch(updateProblemTitle(""));
    dispatch(updateProblemNote(""));
    dispatch(updateProblemStatement(""));
    dispatch(updateProblemInputFormat(""));
    dispatch(updateProblemContraints(""));
    dispatch(updateProblemOutputFormat(""));
    dispatch(updateProblemMemoryLimit(null));
    dispatch(updateProblemTimeLimit(null));
    dispatch(updateProblemLevel("Difficulty"));
    dispatch(updateProblemTags([]));
  };
