import { useState } from "react";
import formatDate from "../../../scripts/formatDate";
import { Entry } from "../../../types/entry";
import { Fixture } from "../../../types/fixture";
import styles from "./ViewEntryComponent.module.scss";

interface ViewEntryProps {
  match: Fixture;
  prediction: Entry["prediction"];
}

export default function ViewEntryComponent({
  match,
  prediction,
}: ViewEntryProps) {
  const predState = typeof prediction === "object";

  function displayPrediction(prediction: string): JSX.Element {
    switch (prediction) {
      // This layout is inclusive of a draw as a home prediction and draw result counts as a loss for the entrant.
      case "home":
        // If the user had predicted a home win, then render a H and conditionally apply styling based on if the home team scored more goals than the away team.
        return (
          <p
            className={
              match.fixture.status.short === "FT"
                ? match.goals.home > match.goals.away
                  ? `${styles.same}`
                  : `${styles.diff}`
                : ""
            }
          >
            H
          </p>
        );
      case "away":
        // If the user predicted an away win, then render an A and apply conditional styling as above.
        return (
          <p
            className={
              match.fixture.status.short === "FT"
                ? match.goals.away > match.goals.home
                  ? `${styles.same}`
                  : `${styles.diff}`
                : ""
            }
          >
            A
          </p>
        );
      default:
        // If a user has predicted a draw, then render an X and apply conditional styling as above.
        return (
          <p
            className={
              match.fixture.status.short === "FT"
                ? match.goals.away == match.goals.home
                  ? `${styles.same}`
                  : `${styles.diff}`
                : ""
            }
          >
            X
          </p>
        );
    }
  }

  function handleHomeWin(goalsHome: number, goalsAway: number): string {
    // Return value of function is passed to data-status attribute in order to conditionally apply styling based upon it.
    if (goalsHome > goalsAway) {
      return "w";
    } else if (goalsHome < goalsAway) {
      return "l";
    } else {
      return "d";
    }
  }

  function handleAwayWin(goalsHome: number, goalsAway: number): string {
    // Return value of function is passed to data-status attribute in order to conditionally apply styling based upon it.
    if (goalsAway > goalsHome) {
      return "w";
    } else if (goalsAway < goalsHome) {
      return "l";
    } else {
      return "d";
    }
  }

  function handleResult(
    status: string,
    goalsHome: number,
    goalsAway: number
  ): string {
    if (status !== "FT") return "-"; // If the match has not completed, then render a "-". Guard clause to stop unnecessary calc by the web browser.

    if (goalsHome > goalsAway) {
      return "H";
    } else if (goalsHome < goalsAway) {
      return "A";
    } else {
      return "X";
    }
  }

  return (
    <div
      id={match.fixture.id.toString()}
      className={styles.matchContainer}
      key={match.fixture.id}
    >
      <div className={styles.matchInfo}>
        <p className={styles.date}>
          {/* Date changed to human readable format */}
          {formatDate(match.fixture.date)}
        </p>
        <p className={styles.venue}>
          {match.fixture.venue.name}, {match.fixture.venue.city}
        </p>
      </div>
      <div className={styles.matchBody}>
        <div className={styles.team}>
          <img src={`${match.teams.home.logo}`} alt={match.teams.home.name} />
          <h1>{match.teams.home.name}</h1>
        </div>
        <div className={styles.centreBody}>
          <div className={styles.predictions}>
            <div className={styles.result}>
              <h1 className={styles.header}>Result</h1>
              <p>
                {handleResult(
                  match.fixture.status.short,
                  match.goals.home,
                  match.goals.away
                )}
              </p>
            </div>
            <div className={styles.prediction}>
              <h1 className={styles.header}>Prediction</h1>
              {predState ? (
                prediction.map((prediction) => {
                  if (match.fixture.id === prediction.match_id) {
                    return displayPrediction(prediction.prediction);
                  }
                })
              ) : (
                <p className={styles.diff}>-</p>
              )}
            </div>
          </div>
          <h1 className={styles.scoreHeader}>Final Score</h1>
          <div className={styles.matchScoreline}>
            <p
              data-status={handleHomeWin(match.goals.home, match.goals.away)}
              className={styles.score}
            >
              {match.goals.home || "0"}
              {/* Print out the goals scored by the home team, or print 0 if null. */}
            </p>
            <p className={styles.scoreSeparator}>-</p>
            <p
              data-status={handleAwayWin(match.goals.home, match.goals.away)}
              className={styles.score}
            >
              {match.goals.away || "0"}
              {/*Print the goals scored by the away team, or print 0 if null. */}
            </p>
          </div>
        </div>
        <div className={styles.team}>
          <img src={`${match.teams.away.logo}`} alt={match.teams.away.name} />
          <h1>{match.teams.away.name}</h1>
        </div>
      </div>
    </div>
  );
}
