import axios from "axios";

const get = async function (url) {
  const response = await axios.get(url);
  debugger

  return handleResponse(response);
};

const post = async function (url, data) {
  const response = await axios.post(url, data);

  return handleResponse(response);
};

const handleResponse = function (response) {
  const { status, data } = response;

  if (status === 200) {
    return data;
  }

  return null;
};

export const CALL = async ({ ...endpoint }) => {
  const { url, method, data } = endpoint;
  if (method === "get") {
    return get(url);
  } else if (method === "post") {
    return post(url, data);
  }
};
