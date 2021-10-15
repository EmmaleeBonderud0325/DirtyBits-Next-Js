import axios from "axios";

// const BASE_URL = "http://localhost:8000/";
const BASE_URL = "https://03f9-111-125-197-86.ngrok.io/";

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
