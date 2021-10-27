import axios from "axios";

const BASE_URL = "https://db-auth.herokuapp.com/";
// const BASE_URL = "http://localhost:8000/";

const PROBLEM_URL = "https://db-code.herokuapp.com/";
// const PROBLEM_URL = "http://localhost:8000/";

export const validateUserName = axios.create({
  baseURL: BASE_URL + "auth/" + "existUsername",
});

export const validateEmail = axios.create({
  baseURL: BASE_URL + "auth/" + "existEmail",
});

export const createUser = axios.create({
  baseURL: BASE_URL + "auth/register",
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

export const AddProblem = axios.create({
  baseURL: PROBLEM_URL + "problems/addProblem",
});

export const uploadTestCases = axios.create({
  baseURL: PROBLEM_URL + "problems/uploadTC",
});
