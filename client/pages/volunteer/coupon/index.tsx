import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";

import styles from "../../../styles/volunteer/coupon/index.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Custom404 from "../../404";
import { useState } from "react";
import useSWR from "swr";
import axios, { AxiosResponse } from "axios";
import { Gameweek } from "../../../types/gameweek";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  withPageAuthRequired();

  const listURL = `http://localhost:3001/gameweek/all`;
  const listResult = await axios
    .get<Array<Gameweek>>(listURL)
    .then((res) => res);

  const wonURL = `http://localhost:3001/gameweek/payout`;
  const wonResult = await axios.get<Array<Gameweek>>(wonURL).then((res) => res);

  return {
    props: {
      AllGameweeks_data: listResult.data,
      AllGameweeks_status: listResult.status,
      WonGameweeks_data: wonResult.data,
      WonGameweeks_status: wonResult.status,
    },
  };
};

const optionSwitch = (
  option: string,
  AllGameweeks_data: Array<Gameweek>,
  AllGameweeks_status: number,
  WonGameweeks_data: Array<Gameweek>,
  WonGameweeks_status: number
) => {
  switch (option) {
    case "":
      return;
    case "res":
      return (
        <Results
          AllGameweeks_data={AllGameweeks_data}
          AllGameweeks_status={AllGameweeks_status}
        />
      );
    case "win":
      return (
        <Winners
          WonGameweeks_data={WonGameweeks_data}
          WonGameweeks_status={WonGameweeks_status}
        />
      );
    default:
      return;
  }
};

interface WinnersProps {
  WonGameweeks_data: Array<Gameweek>;
  WonGameweeks_status: number;
}

// Not Implemented //TODO
export function Winners({
  WonGameweeks_data,
  WonGameweeks_status,
}: WinnersProps) {
  switch (WonGameweeks_status) {
    case 204:
      return (
        <>
          <h1>No Data Found</h1>
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

interface ResultsProps {
  AllGameweeks_data: Array<Gameweek>;
  AllGameweeks_status: number;
}

export function Results({
  AllGameweeks_data,
  AllGameweeks_status,
}: ResultsProps) {
  switch (AllGameweeks_status) {
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
              {AllGameweeks_data.map((matchweek: Gameweek) => {
                return (
                  <tr key={matchweek.id}>
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

interface VolunteerProps {
  AllGameweeks_data: Array<Gameweek>;
  AllGameweeks_status: number;
  WonGameweeks_data: Array<Gameweek>;
  WonGameweeks_status: number;
}

export default function Volunteer(props: VolunteerProps) {
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
        {optionSwitch(
          option,
          props.AllGameweeks_data,
          props.AllGameweeks_status,
          props.WonGameweeks_data,
          props.WonGameweeks_status
        )}
      </div>
    </Layout>
  );
}
