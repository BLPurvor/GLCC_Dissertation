import { useState } from "react";
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

  return (
    <div
      id={match.fixture.id.toString()}
      className={styles.matchContainer}
      key={match.fixture.id}
    >
      <div className={styles.matchInfo}>
        <p className={styles.date}>
          {/* Date changed to human readable format */}
          {new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            weekday: "long",
            day: "numeric",
            month: "long",
          }).format(new Date(match.fixture.date))}
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
                {match.goals.home > match.goals.away
                  ? `H`
                  : match.goals.away > match.goals.home
                  ? `A`
                  : match.fixture.status.short !== "FT"
                  ? "-"
                  : "X"}
              </p>
            </div>
            <div className={styles.prediction}>
              <h1 className={styles.header}>Prediction</h1>
              {predState ? (
                prediction.map((prediction) => {
                  if (match.fixture.id === prediction.match_id) {
                    switch (prediction.prediction) {
                      case "home":
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
                })
              ) : (
                <p className={styles.diff}>-</p>
              )}
            </div>
          </div>
          <h1 className={styles.scoreHeader}>Final Score</h1>
          <div className={styles.matchScoreline}>
            <p
              data-status={
                match.goals.home > match.goals.away
                  ? "w"
                  : match.goals.away > match.goals.home
                  ? "l"
                  : "d"
              }
              className={styles.score}
            >
              {match.goals.home || "0"}
            </p>
            <p className={styles.scoreSeparator}>-</p>
            <p
              data-status={
                match.goals.home < match.goals.away
                  ? "w"
                  : match.goals.away < match.goals.home
                  ? "l"
                  : "d"
              }
              className={styles.score}
            >
              {match.goals.away || "0"}
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
