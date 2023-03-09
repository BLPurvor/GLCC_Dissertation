import { Entry } from "../../../types/entry";
import { Fixture } from "../../../types/fixture";

import styles from "./NewEntryComponent.module.scss";

interface EntryComponentProps {
  match: Fixture;
  prevEntry: Entry["prediction"];
  index: number;
  canChange: boolean;
}

export default function NewEntryComponent({
  match,
  prevEntry,
  index,
  canChange,
}: EntryComponentProps) {
  let prediction = Object.values(prevEntry[index]).join("-");

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
        <p className={styles.matchSeparator}>v</p>
        <div className={styles.team}>
          <img src={`${match.teams.away.logo}`} alt={match.teams.away.name} />
          <h1>{match.teams.away.name}</h1>
        </div>
      </div>
      <div className={styles.matchPredictor}>
        <fieldset id={match.fixture.id.toString()}>
          <label htmlFor={`${match.fixture.id}-home`}>
            <input
              type="radio"
              value="home"
              name={match.fixture.id.toString()}
              id={`${match.fixture.id}-home`}
              checked={
                canChange
                  ? undefined
                  : `${match.fixture.id}-home` === prediction
              }
            />
            <div className={styles.button}>
              {match.teams.home.name}
              <br />
              Wins
            </div>
          </label>
          <label htmlFor={`${match.fixture.id}-draw`}>
            <input
              type="radio"
              value="draw"
              name={match.fixture.id.toString()}
              id={`${match.fixture.id}-draw`}
              checked={
                canChange
                  ? undefined
                  : `${match.fixture.id}-draw` === prediction
              }
            />
            <div className={styles.button}>Draw</div>
          </label>
          <label htmlFor={`${match.fixture.id}-away`}>
            <input
              type="radio"
              value="away"
              name={match.fixture.id.toString()}
              id={`${match.fixture.id}-away`}
              checked={
                canChange
                  ? undefined
                  : `${match.fixture.id}-away` === prediction
              }
            />
            <div className={styles.button}>
              {match.teams.away.name}
              <br />
              Wins
            </div>
          </label>
        </fieldset>
      </div>
    </div>
  );
}
