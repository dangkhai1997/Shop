import axios from "axios";

const get = async function (url) {
  const response = await axios.get(url);

  return response.data;
};

const post = async function (url, data) {
  const response = await axios.post(url, data).catch(handleError.bind(this));
  console.log(response.data);
  return response.data;
};

const handleError = ({ response }) => {
  const { data } = response;
  // return {data: data};
  return Promise.resolve({
    data: data,
  });
};

export const CALL = async ({ ...endpoint }) => {
  const { url, method, data } = endpoint;
  if (method === "get") {
    return get(url);
  } else if (method === "post") {
    return post(url, data);
  }
};
