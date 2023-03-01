import axios from "axios";

export const getResults = async (url: string) => {
  let result = axios
    .get(url)
    .then((res) => {
      res;
    })
    .catch((err) => {
      err;
    });

  return result;
};
