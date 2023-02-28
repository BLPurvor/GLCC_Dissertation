import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";

import styles from "../../../styles/volunteer/coupon/new.module.scss";
import Custom404 from "../../404";

import imgPL from "../../../assets/shared/football/pl.png";
import imgCH from "../../../assets/shared/football/ch.png";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Fixture } from "../../../types/fixture";
import Image from "next/image";

export const getServerSideProps = withPageAuthRequired(); // Force the user to be actively logged in using Auth0 extension.

export default function NewCoupon() {
  const { user, isLoading } = useUser(); // Get current user information.
  const [fixtures, setFixtures] = useState(Array<Fixture>); // Fixtures array defined through state for conditional rendering of fixture checkboxes.
  const [selection, setSelection] = useState(Array<Element>);
  const [postError, setPostError] = useState("");

  if (!user || !user.sub) return <Custom404 />; // If user isn't logged in, or if the sub value - which is used for identification - isn't defined, send the user to the error page.
  if (isLoading) return <Loading />; // If the page is still loading logic, render the loading component.

  const user_id: string = user.sub.substring(user.sub.indexOf("|") + 1); // Strip the prefix away from auth0 sub value. If users log in using third party providers, i.e. GitHub, then the prefix is of differing lengths, so must search for the location of the pipe separator.

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Stop form submitting post/get request to the page upon submission.

    const form = document.querySelector("#dateSelect") as HTMLFormElement; // Form with ID = "dateSelect" is defined on page load. ! operator forces program to consider it as non-nullable.

    const url = `http://localhost:3001/matches/between/2022/${form.startDate.value}/${form.endDate.value}/${form.league.value}`; // Concatenate values from the form fields when the query is run. Season not a requirement at this stage of development

    const result = await axios.get(url).then((res) => res);

    setFixtures(result.data[0].response);
    // Set state of function array to given object as pulled from returned object.
  }

  async function handleCreation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let form = document.querySelector("#fixtureSelect") as HTMLFormElement;
    let matches: Array<string> = [];

    for (let i = 0; i < form.length - 1; i++) {
      if (form[i].checked) {
        console.log(form[i].id);
        matches.push(form[i].id);
      }
    }

    if (matches.length !== 8) {
      return setPostError("not8|Please ensure you select 8 fixtures.");
    }

    let matchweek = matches.join("-");
    console.log(matchweek);
  }

  function handleRender(fixtures: Fixture[] | string) {
    // Check if the passed prop is a string, i.e. If an error code is passed back from axios response
    if (typeof fixtures === "string" || fixtures === undefined) {
      return (
        <div className={styles.errContainer}>
          <h1>Something went wrong.</h1>
          <p>
            We aren't sure what has happened, but something has gone wrong.
            Please try again later.
            <br />
            Please contact the administrator if this error persists.
          </p>
        </div>
      );
    }

    // If typeof doesn't return a string or an error code, then render the matches.
    return fixtures.map((fixture) => {
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
    });
  }

  function handleUpdate() {
    let checkedElements = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );

    setSelection(Array.from(checkedElements));
  }

  return (
    <Layout user_id={user_id}>
      <div className={styles.container}>
        <h1 className={styles.txtHeader}>Create a New Coupon</h1>
        <form
          onSubmit={handleSubmit}
          id="dateSelect"
          className={styles.dateSelect}
        >
          <div className={styles.dateInputGroupGroup}>
            <div className={styles.dateInputGroup}>
              <label htmlFor="startDate">Fixtures from</label>
              <input
                required
                type="date"
                className={`${styles.dateSelect} ${styles.startDate}`}
                name="startDate"
                id="startDate"
              />
            </div>
            <div className={styles.dateInputGroup}>
              <label htmlFor="endDate">Fixtures to</label>
              <input
                required
                type="date"
                className={`${styles.dateSelect} ${styles.endDate}`}
                name="endDate"
                id="endDate"
              />
            </div>
          </div>
          <div className={styles.leagueHousing}>
            <label htmlFor="leaguePL" className={styles.leagueSelector}>
              <input type="radio" id="leaguePL" name="league" value="39" />
              <div className={styles.leagueSelectHousing}>
                <Image
                  width={50}
                  height={50}
                  src={imgPL}
                  alt="The Premier League"
                />
                The Premier League
              </div>
            </label>
            <label htmlFor="leagueCH" className={styles.leagueSelector}>
              <input type="radio" id="leagueCH" name="league" value="40" />
              <div className={styles.leagueSelectHousing}>
                <Image
                  width={50}
                  height={50}
                  src={imgCH}
                  alt="The EFL Championship"
                />
                EFL Championship
              </div>
            </label>
          </div>
          <input
            type="submit"
            className={styles.dateSubmit}
            value="Get Fixtures"
          />
        </form>
        <div
          className={`${styles.counter} 
          ${selection.length === 0 ? styles.invisible : ""} 
          ${selection.length < 8 ? styles.invalidMatches : ""}`}
        >
          <span className={styles.counterxt}>{selection.length}/8 Matches</span>
        </div>
        <form
          className={styles.fixtureHousing}
          id="fixtureSelect"
          onSubmit={handleCreation}
          onChange={handleUpdate}
        >
          <input
            className={styles.matchweekSubmit}
            disabled={selection.length < 8}
            hidden={fixtures.length < 1}
            type="submit"
            value="Create Matchweek"
          />
          {fixtures !== null ? handleRender(fixtures) : handleRender("Null")}
        </form>
      </div>
    </Layout>
  );
}
