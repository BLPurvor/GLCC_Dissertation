import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";

import styles from "../../../styles/volunteer/coupon/new.module.scss";
import Custom404 from "../../404";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Fixture } from "../../../types/fixture";
import Link from "next/link";
import FixtureSelector from "../../../components/coupon/FixtureSelector/FixtureSelector";

export const getServerSideProps = withPageAuthRequired(); // Force the user to be actively logged in using Auth0 extension.

export default function NewCoupon() {
  const { user, isLoading } = useUser(); // Get current user information.
  const [fixtures, setFixtures] = useState(Array<Fixture>); // Fixtures array defined through state for conditional rendering of fixture checkboxes.
  const [selection, setSelection] = useState(Array<Element>);
  const [postError, setPostError] = useState({ status: 0, message: "" });

  if (!user || !user.sub) return <Custom404 />; // If user isn't logged in, or if the sub value - which is used for identification - isn't defined, send the user to the error page.
  if (isLoading) return <Loading />; // If the page is still loading logic, render the loading component.

  const user_id: string = user.sub.substring(user.sub.indexOf("|") + 1); // Strip the prefix away from auth0 sub value. If users log in using third party providers, i.e. GitHub, then the prefix is of differing lengths, so must search for the location of the pipe separator.

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Stop form submitting post/get request to the page upon submission.

    const form = document.querySelector("#dateSelect") as HTMLFormElement; // Form with ID = "dateSelect" is defined on page load. ! operator forces program to consider it as non-nullable.

    const url = `http://localhost:3001/matches/between/2022/${form.startDate.value}/${form.endDate.value}/39-40`; // Concatenate values from the form fields when the query is run. Season not a requirement at this stage of development

    const result = await axios.get(url).then((res) => res);

    setFixtures(result.data);
    // Set state of function array to given object as pulled from returned object.
  }

  async function handleCreation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let form = document.querySelector("#fixtureSelect") as HTMLFormElement;
    let deadline = form[0] as HTMLInputElement;
    let matches: Array<string> = [];

    for (let i = 0; i < form.length - 1; i++) {
      let element = form[i] as HTMLInputElement;

      if (element.checked) {
        matches.push(element.id);
      }
    }

    if (matches.length !== 8) {
      return setPostError({
        message: "not8|Please ensure you select 8 fixtures.",
        status: 400,
      });
    }

    let matchweek = matches.join("-");

    let url = "http://localhost:3001/gameweek/create";

    let uploadResult = await axios
      .post(url, {
        user_id,
        matches: matchweek,
        deadline: deadline.value,
      })
      .then((res) => res);

    if (uploadResult.status === 200) {
      setSelection([]);
      setFixtures([]);
    }

    setPostError({ message: uploadResult.data, status: uploadResult.status });
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
      return <FixtureSelector fixture={fixture} />;
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
          <div
            data-return-status={postError.status}
            className={styles.returnMessageContainer}
          >
            <span className={styles.statusCode}>{postError.status}: </span>
            <span className={styles.statusMessage}>{postError.message}</span>
            <Link href="/volunteer/coupon">View Coupons</Link>
          </div>
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
          <input
            type="submit"
            className={styles.dateSubmit}
            value="Get Fixtures"
          />
        </form>
        <div
          className={`${styles.counter} 
          ${selection.length === 0 ? styles.invisible : ""} 
          ${
            selection.length < 8 || selection.length > 8
              ? styles.invalidMatches
              : ""
          }`}
        >
          <span className={styles.counterxt}>{selection.length}/8 Matches</span>
        </div>
        <form
          className={styles.fixtureHousing}
          id="fixtureSelect"
          onSubmit={handleCreation}
          onChange={handleUpdate}
        >
          <label htmlFor="deadline" hidden={fixtures.length < 1}>
            Submission Deadline
            <input
              required
              className={styles.dateSelect}
              type="datetime-local"
              hidden={fixtures.length < 1}
            />
          </label>
          <input
            className={styles.matchweekSubmit}
            disabled={selection.length < 8 || selection.length > 8}
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
