import express, { Request, Response } from "express";
import { getBetweenDates, getFromList } from "../controller/matches";
import { FootballRequest } from "../types/FootballRequest";
const router = express.Router();

router.get(
  "/between/:season/:startDate/:endDate/:league",
  async (req: Request, res: Response) => {
    //Parse multiple league selections
    let param = req.params.league;
    // Split leagues parameter by given separator
    var split = param.split("-");

    // Loop through leagues and cast to number for request functionality and validation
    let splitLeagues: number[] = [];
    for (let i = 0; i < split.length; i++) {
      // If the input cannot be parsed to a number, return an error to client.
      splitLeagues[i] = parseInt(split[i]);
    }

    // Parse all other URL Params

    // If Season parameter is not a number, return an error to client.
    if (isNaN(parseInt(req.params.season))) {
      return res.status(401).send("ERPSNN");
    } else {
      var season = parseInt(req.params.season);
    }

    // If startDate parameter cannot be cast to a number then it fails to parse to a date later
    if (isNaN(Date.parse(req.params.startDate))) {
      // Return an error to client if date cannot be parsed to a number.
      // If this check fails, the API will also return an error stating that inputs must match their given requirements which will be returned to the user
      return res.status(401).send("ERSDNV");
    } else {
      // ISO8601 string contains date parameters in first 10 characters i.e. 2023-01-01
      var startDate = new Date(req.params.startDate)
        .toISOString()
        .substring(0, 10);
    }

    if (isNaN(Date.parse(req.params.endDate))) {
      // Similar to above, returns an error if endDate parameter cannot be parsed to a number

      return res.status(401).send("EREDNV");
    } else {
      // ISO8601 string contains date parameters in first 10 characters i.e. 2023-01-01
      var endDate = new Date(req.params.endDate).toISOString().substring(0, 10);
    }

    const options = {
      season: season,
      startDate: startDate,
      endDate: endDate,
    };

    let fixturesPL = await getBetweenDates(39, options);
    let fixturesCH = await getBetweenDates(40, options);
    // Request from API server based on specific league information, cannot request multiple leagues through API.

    var fullList = fixturesPL.response.concat(fixturesCH.response);
    // Merge arrays for Premier League and EFL Championship into one array

    return res.status(200).send(fullList);
  }
);

router.get("/list/:idList", async (req: Request, res: Response) => {
  const param: string = req.params.idList;
  // Only parameter to parse in this instance, structuring of request will take place on the client side and in tandem with the Gameweek controller.

  // Check if parameter is defined.
  if (param === "" || param === null) {
    return res.status(401).send("EFFBLI");
  }

  // Check contents of string parameter.
  let paramArray: Array<string> = param.split("-");
  // Split string into array for value checking

  const isNumber = (currentValue: string) => !isNaN(parseInt(currentValue));
  if (!paramArray.every(isNumber)) return res.status(401).send("EFIDNN");
  // If every item in array doesn't pass given test in isNumber(), then return error to client, do not continue to process request.

  let result = await getFromList(param);
  return res.send(result);
});

export { router as routeMatches };
