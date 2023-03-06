import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";

import styles from "../../../styles/volunteer/coupon/index.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Custom404 from "../../404";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Gameweek } from "../../../types/gameweek";

export const getServerSideProps = withPageAuthRequired();

const optionSwitch = (option: string) => {
  switch (option) {
    case "":
      return;
    case "res":
      return <Results />;
    case "win":
      return <Winners />;
    default:
      return;
  }
};

// Not Implemented //TODO
export function Winners() {
  let URL = `http://localhost:3001/gameweek/payout`;

  const fetcher = () =>
    axios
      .get(URL)
      .then((res) => res)
      .catch((err) => err);
  const { data, error, isLoading } = useSWR(URL, fetcher);

  if (isLoading || !data) return <Loading />;

  if (error) return <>Error: {error.response.data}</>;

  switch (data.status) {
    case 204:
      return (
        <>
          <h1>No Data Found</h1>
        </>
      );

    default:
      console.log(data);
      return (
        <div>
          <h1>Something went wrong.</h1>
        </div>
      );
  }
}

export function Results() {
  let URL = `http://localhost:3001/gameweek/all`;

  const fetcher = () => axios.get(URL).then((res) => res);
  const { data, error, isLoading } = useSWR(URL, fetcher);

  if (isLoading || !data) return <Loading />;

  if (error) return <>Error: {error.data}</>;

  switch (data.status) {
    case 204:
      return (
        <>
          <h1>No Data Found</h1>
        </>
      );

    case 200:
      return (
        <>
          <table className={styles.resultsContainer}>
            <thead>
              <tr>
                <th>Week ID</th>
                <th>Prize</th>
                <th>Paid out?</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((matchweek: Gameweek) => {
                return (
                  <tr>
                    <td>{matchweek.id}</td>
                    <td>
                      {Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                        currencyDisplay: "narrowSymbol",
                        maximumFractionDigits: 0,
                      }).format(matchweek.prize)}
                    </td>
                    <td
                      data-payout={matchweek.did_payout}
                      className={`${styles.payout}`}
                    >
                      {matchweek.did_payout ? "Yes" : "No"}
                    </td>
                    <td>
                      <Link href={`/volunteer/coupon/${matchweek.id}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      );

    default:
      return (
        <div>
          <h1>Something went wrong.</h1>
        </div>
      );
  }
}

export default function Volunteer() {
  const [option, setOption] = useState("");
  const { user, isLoading } = useUser();

  if (!user || !user.sub) return <Custom404 />;
  if (isLoading) return <Loading />;

  const user_id: string = user.sub.substring(user.sub.indexOf("|") + 1);

  return (
    <Layout user_id={user_id}>
      <div className={styles.container}>
        <h1>Football Coupon - Home</h1>
        <div className={styles.options}>
          <Link href="/volunteer/coupon/new">
            <button onClick={() => setOption("new")}>
              Create New Matchweek
            </button>
          </Link>
          <button onClick={() => setOption("res")}>Results</button>
          <button onClick={() => setOption("win")}>Previous Winners</button>
        </div>
        {optionSwitch(option)}
      </div>
    </Layout>
  );
}
