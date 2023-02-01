import express, { Request, Response } from "express";
import { getBetweenDates } from "../controller/matches";
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
      // if (isNaN(parseInt(split[i]))) {
      //   return res.status(401).send("ERLNAN");
      // }
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

    // Request from API server based on specific league information, cannot request multiple leagues through API.
    var fixturesByLeague = [];
    for (let i = 0; i < splitLeagues.length; i++) {
      // Loop through given leagues and return as sections of an array for handling on front end.
      fixturesByLeague[i] = await getBetweenDates(splitLeagues[i], options);
    }

    return res.send(fixturesByLeague);
  }
);

export { router as routeMatches };
