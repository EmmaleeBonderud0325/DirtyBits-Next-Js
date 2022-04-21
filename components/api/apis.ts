import axios from "axios";
import { CreateAxiosRequest } from "./CreateAxiosRequest";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const PROBLEM_URL = "http://localhost:8000/";
const PROBLEM_URL = process.env.NEXT_PUBLIC_PROBLEM_URL;
const NOTIFICATION_URL = process.env.NEXT_PUBLIC_NOTIFICATION_URL;

const localhost = "http://localhost:8000/";

export const validateUserName = axios.create({
  baseURL: BASE_URL + "auth/" + "existUsername",
});

export const validateEmail = axios.create({
  baseURL: BASE_URL + "auth/" + "existEmail",
});

export const createUser = axios.create({
  baseURL: BASE_URL + "auth/register",
});

export const logoutUser = axios.create({
  baseURL: BASE_URL + "auth/logout",
});

export const signinApi = axios.create({
  baseURL: BASE_URL + "auth/authenticate",
});

export const refreshTokenApi = axios.create({
  baseURL: BASE_URL + "auth/refresh",
});

export const googleLoginApi = axios.create({
  baseURL: BASE_URL + "auth/google",
});

export const githubLoginApi = axios.create({
  baseURL: BASE_URL + "auth/github",
});

export const resetPassword = axios.create({
  baseURL: BASE_URL + "auth/resetPass",
});

export const changePass = axios.create({
  baseURL: BASE_URL + "auth/changepassmail",
});

export const verifyVerificationCode = axios.create({
  baseURL: BASE_URL + "auth/verifyUser",
});

export const getTagsApi = axios.create({
  baseURL: PROBLEM_URL + "problems/getTagListCreateProblem",
});

export const AddProblem = CreateAxiosRequest(
  PROBLEM_URL + "problems/addProblem"
);

export const uploadImage = axios.create({
  baseURL: BASE_URL + "problems/uploadProblemImage",
});

export const UpdateProblem = CreateAxiosRequest(
  PROBLEM_URL + "problems/updateProblem"
);

export const uploadTestCases = axios.create({
  baseURL: PROBLEM_URL + "problems/uploadTC",
});

export const getProblemsList = axios.create({
  baseURL: PROBLEM_URL + "problems/getProblemsList",
});

export const getProblemsStatus = CreateAxiosRequest(
  PROBLEM_URL + "problems/getProblemsStatus"
);

export const getProblem = axios.create({
  baseURL: PROBLEM_URL + "problems/getProblem",
});

export const filterProblemData = axios.create({
  baseURL: PROBLEM_URL + "problems/getFilteredProblemsList",
});

export const runCode = CreateAxiosRequest(PROBLEM_URL + "core/compilecode");

export const submitCode = CreateAxiosRequest(PROBLEM_URL + "core/runcode");

export const runTestCases = CreateAxiosRequest(PROBLEM_URL + "core/runtests");

export const getProblemPageDataApi = CreateAxiosRequest(
  PROBLEM_URL + "problems/getProblemPageData"
);

export const getSubmissionsList = CreateAxiosRequest(
  PROBLEM_URL + "problems/getsubmissionslist"
);

export const upAndDownVoteHandler = CreateAxiosRequest(
  PROBLEM_URL + "problems/handleupvotedownvote"
);

export const handleBookmark = CreateAxiosRequest(
  PROBLEM_URL + "problems/handlebookmark"
);

export const uploadCode = CreateAxiosRequest(PROBLEM_URL + "problems/saveCode");

export const getSavedCode = CreateAxiosRequest(
  PROBLEM_URL + "problems/getSavedCode"
);

export const getUserProfile = CreateAxiosRequest(BASE_URL + "auth/getProfile");

export const getStaticData = CreateAxiosRequest(
  BASE_URL + "auth/getStaticData"
);

export const getAllSubmissions = CreateAxiosRequest(
  PROBLEM_URL + "problems/getUserSubmissions"
);
export const recentSubmissions = CreateAxiosRequest(
  PROBLEM_URL + "problems/getUserSubmissions"
)

export const getNotificationsStartup = CreateAxiosRequest(
  NOTIFICATION_URL + "get"
);
