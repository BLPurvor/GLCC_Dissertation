import axios from "axios";

export const userInfoFetch = (url: string) => {
  axios.get(url).then((res) => res.data);
};
