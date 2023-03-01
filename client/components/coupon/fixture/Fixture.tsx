import { Fixture } from "../../../types/fixture";

import styles from "./Fixture.module.scss";

export default function FixtureComponent(props: { fixture: Fixture }) {
  const fixture = props.fixture;
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
          <p className={styles.date}>
            {new Intl.DateTimeFormat("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              weekday: "long",
              day: "numeric",
              month: "long",
            }).format(new Date(fixture.fixture.date))}
          </p>
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
