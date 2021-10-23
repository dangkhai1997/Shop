import axios from "axios";
import * as actions from "../redux";
import { store } from "../redux";

const get = async function (url) {
  const response = await axios.get(url);
  return response.data;
};

const post = async function (url, data) {
  const response = await axios.post(url, data).catch(handleError.bind(this));
  return response.data;
};

const put = async function (url, data) {
  const response = await axios.put(url, data).catch(handleError.bind(this));
  return response.data;
};

const callDelete = async function (url, data) {
  const response = await axios
    .delete(url, { data: data })
    .catch(handleError.bind(this));
  return response.data;
};

const handleError = ({ response }) => {
  const { data } = response;
  return Promise.resolve({
    data: data,
  });
};

export const CALL = async ({ ...endpoint }) => {
  store.dispatch(actions.startLoading());
  const { url, method, data } = endpoint;
  if (method === "get") {
    const response = await get(url);
    store.dispatch(actions.stopLoading());

    return response;
  } else if (method === "post") {
    const response = await post(url, data);
    store.dispatch(actions.stopLoading());

    return response;
  } else if (method === "put") {
    const response = await put(url, data);
    store.dispatch(actions.stopLoading());

    return response;
  } else if (method === "delete") {
    const response = await callDelete(url, data);
    store.dispatch(actions.stopLoading());

    return response;
  }
};
