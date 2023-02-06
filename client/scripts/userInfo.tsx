import axios from "axios";

export const userRoleFetch = async (url: string) => {
  let result = axios
    .get(`${process.env.LOCAL_SERVER_URL!}${url}`)
    .then((res) => res.data);

  return result;
};

export const userInfoFetch = async (url: string) => {
  let result = axios.get(url).then((res) => res.data);

  return result;
};

export const walletInfoFetch = async (url: string) => {
  let result = axios.get(url).then((res) => res.data);

  return result;
};
