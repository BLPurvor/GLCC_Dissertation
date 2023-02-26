import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";

import styles from "../../../styles/volunteer/coupon/new.module.scss";
import Custom404 from "../../404";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FormEvent, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { Fixture } from "../../../types/fixture";
import Image from "next/image";

export const getServerSideProps = withPageAuthRequired();

function handleDateSelect(
  e: FormEvent<HTMLFormElement>,
  setFormState: Function,
  setPageState: Function
) {}

//   const URL = `http://localhost:3001/matches/between/${season}/${startDate}/${endDate}/${league}`;
//   const fetcher = () => axios.get(URL).then((res) => res);

//   const { data, error, isLoading } = useSWR(URL, fetcher);

//   if (isLoading || !data) return <Loading />;
//   if (error) return <>Error: {error.data}</>;

//   if (data.status !== 200 && data.status !== 204) {
//     switch (data.data) {
//       case "EFSNAN": // Error fetching - Season NaN
//         return <>{console.log(data.data)}EFSNAN</>;
//       case "EFSDNN": // Error fetching - Start date NaN
//         return <>{console.log(data.data)}EFSDNN</>;
//       case "EFEDNN": // Error fetching - End Date NaN
//         return <>{console.log(data.data)}EFEDNN</>;
//       default:
//         break;
//     }
//   } else if (data.status === 204) {
//     return <>204 Return No Content</>;
//   }

//   return <>200 Return {console.log(data)}</>;
// }

export default function NewCoupon() {
  const { user, isLoading } = useUser();
  const [fixtures, setFixtures] = useState(Array<Fixture>);
  const [formState, setFormState] = useState({
    startDate: "",
    endDate: "",
    league: "",
  });

  if (!user || !user.sub) return <Custom404 />;
  if (isLoading) return <Loading />;

  const user_id: string = user.sub.substring(user.sub.indexOf("|") + 1);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = document.querySelector("#dateSelect")!;

    const url = `http://localhost:3001/matches/between/2022/${form.startDate.value}/${form.endDate.value}/${form.league.value}`;

    const result = await axios.get(url).then((res) => res);

    setFixtures(result.data[0].response);
  }

  async function handleCreation(e: FormEvent<HTMLFormElement>) {}

  return (
    <Layout user_id={user_id}>
      <div className={styles.container}>
        <h1>Create a New Coupon</h1>
        <form onSubmit={handleSubmit} id="dateSelect">
          <input
            required
            type="date"
            className={`${styles.dateSelect} ${styles.startDate}`}
            name="startDate"
            id="startDate"
          />
          <input
            required
            type="date"
            className={`${styles.dateSelect} ${styles.endDate}`}
            name="endDate"
            id="endDate"
          />
          <legend>Select a league.</legend>
          <div>
            <input
              required
              type="radio"
              id="leaguePL"
              name="league"
              value="39"
            />
            <label htmlFor="leaguePL">The Premier League</label>
          </div>
          <div>
            <input
              required
              type="radio"
              id="leagueCH"
              name="league"
              value="40"
            />
            <label htmlFor="leagueCH">EFL Championship</label>
          </div>
          <input type="submit" className={styles.dateSubmit} />
        </form>
        <form onSubmit={handleCreation}>
          {fixtures.map((fixture) => {
            return (
              //TODO
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
          })}
        </form>
      </div>
    </Layout>
  );
}
