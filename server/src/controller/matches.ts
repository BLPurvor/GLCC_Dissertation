import axios from "axios";
import { config } from "dotenv";

const Leagues = {
  engDiv1: "39",
  engDiv2: "40",
};

type urlOptions = {
  season: number;
  startDate: string;
  endDate: string;
};

// Fetch all data fixtures between given date to pass to Next.JS front-end selector for volunteers/admins
export const getBetweenDates = async (
  league: number,
  urlOptions: urlOptions
): Promise<any> => {
  const options = {
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: {
      league: league,
      season: urlOptions.season,
      from: urlOptions.startDate,
      to: urlOptions.endDate,
    },
    headers: {
      "X-RapidAPI-Key": process.env.FBAPI_KEY,
      "X-RapidAPI-Host": process.env.FBAPI_HOST,
    },
  };

  let result = axios
    .request(options)
    .then((response) => {
      if (Object.keys(response.data.errors).length > 0) {
        return response.data.errors;
      }
      return response.data;
    })
    .catch((error) => {
      return error;
    });

  return result;
};
