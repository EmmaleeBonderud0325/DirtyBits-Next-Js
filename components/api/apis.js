import axios from "axios";
import { CreateAxiosRequest } from "./CreateAxiosRequest";

const BASE_URL = "https://db-auth.herokuapp.com/";

const PROBLEM_URL = "https://db-code.herokuapp.com/";

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

export const changePass = axios.create({
  baseURL: BASE_URL + "auth/changepassmail",
});

export const verifyVerificationCode = axios.create({
  baseURL: BASE_URL + "auth/verifyUser",
});

export const AddProblem = CreateAxiosRequest(
  PROBLEM_URL + "problems/addProblem"
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
