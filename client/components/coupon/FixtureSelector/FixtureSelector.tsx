import formatDate from "../../../scripts/formatDate";
import { Fixture } from "../../../types/fixture";

import styles from "./FixtureSelector.module.scss";

interface SelectorProps {
  fixture: Fixture;
}

export default function FixtureSelector({ fixture }: SelectorProps) {
  return (
    <label
      key={fixture.fixture.id}
      htmlFor={fixture.fixture.id.toString()}
      className={styles.fixture}
    >
      <input
        type="checkbox"
        id={fixture.fixture.id.toString()}
        name={fixture.fixture.id.toString()}
        value={fixture.fixture.id}
      />
      <div className={styles.housing}>
        <div className={styles.fixtureInfo}>
          <p className={styles.date}>{formatDate(fixture.fixture.date)}</p>
          <p className={styles.venue}>
            {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
          </p>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.team}>
            <img
              src={`${fixture.teams.home.logo}`}
              alt={fixture.teams.home.name}
            />
            <h1>{fixture.teams.home.name}</h1>
          </div>
          <p className={styles.matchSeparator}>v</p>
          <div className={styles.team}>
            <img
              src={`${fixture.teams.away.logo}`}
              alt={fixture.teams.away.name}
            />
            <h1>{fixture.teams.away.name}</h1>
          </div>
        </div>
      </div>
    </label>
  );
}
