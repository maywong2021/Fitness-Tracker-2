import axios from "axios";
const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api/";

export const api = axios.create({
  baseURL: `${BASE_URL}`,
});

export const callApi = async ({
  url,
  method,
  token,
  body,
  displayErrorNotification = false,
}) => {
  try {
    const options = {
      method: method ? method.toLowerCase() : "get",
      url: `${BASE_URL}${url}`,
      data: body,
    };
    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }
    const { data } = await api(options);
    if (data.error) throw data.error;

    return data;
  } catch (error) {
    const errToThrow = error?.response?.data?.error; // handle axios 400- and 500-level errors
    console.error(errToThrow);
    if (displayErrorNotification) {
      alert(errToThrow);
    }
  }
};

export const login = async (username, password) => {
  console.log("username", username);
  console.log("password", password);
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const responseObject = await response.json();
    console.log("responseObject", responseObject);
    return responseObject;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, password) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const { token } = await response.json();
  return token;
};

export const getUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // need both username and id for activities and routines page
    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error(error);
  }
};
