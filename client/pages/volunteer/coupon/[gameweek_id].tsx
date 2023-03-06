import Loading from "../../../components/Loading";
import Layout from "../../../components/Layout";
import Custom404 from "../../404";

import { Gameweek } from "../../../types/gameweek";
import { Fixture } from "../../../types/fixture";
import styles from "../../../styles/volunteer/coupon/[gameweek_id].module.scss";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps } from "next";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  withPageAuthRequired();
  const { gameweek_id: g_id } = ctx.query;
  const gwData = await axios
    .get(`http://localhost:3001/gameweek/${g_id}`)
    .then((res) => res);
  const listData = await axios
    .get(`http://localhost:3001/matches/list/${gwData.data.matches}`)
    .then((res) => res);

  return {
    props: {
      gameweek: gwData.data,
      matches: listData.data.response,
    },
  };
};

export default function Gameweek_Id({
  gameweek,
  matches,
}: {
  gameweek: Gameweek;
  matches: Fixture[];
}) {
  const [resultState, setResultState] = useState({ code: 0, message: "" });

  const { user, isLoading } = useUser();
  const router = useRouter();
  const { gameweek_id: g_id } = router.query;

  if (!user || !user.sub || !g_id) return <Custom404 />;
  if (isLoading) return <Loading />;

  const user_id: string = user.sub.substring(user.sub.indexOf("|") + 1);

  if (resultState.code === 0) {
    switch (gameweek.toString()) {
      case "EFIDNR":
        setResultState({
          code: 404,
          message:
            "Could not find a gameweek with that ID number. Please try again later.",
        });
        break;
      case "[object Object]":
        setResultState({
          code: 200,
          message: "Successfully fetched gameweek information.",
        });
        break;
      default:
        break;
    }
  }

  if (resultState.code === 404) {
    return (
      <Layout user_id={user_id}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <h1>Error {resultState.code}</h1>
            <p>{resultState.message}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (resultState.code === 200) {
    return (
      <Layout user_id={user_id}>
        <div className={styles.container}>
          <h1>Gameweek {gameweek.id}</h1>
          <table className={styles.detailsTable}>
            <thead>
              <tr>
                <th>Prize Amount</th>
                <th>Won</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                    currencyDisplay: "narrowSymbol",
                    maximumFractionDigits: 0,
                  }).format(gameweek.prize)}
                </td>
                <td data-payout-status={gameweek.did_payout}>
                  {gameweek.did_payout ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.matchesContainer}>
            {matches.map((match: Fixture) => {
              return (
                <div className={styles.matchContainer}>
                  <div className={styles.matchWhenWhere}>
                    <p className={styles.location}>
                      {match.fixture.venue.name}, {match.fixture.venue.city}
                    </p>
                    <p className={styles.datetime}>
                      {new Intl.DateTimeFormat("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      }).format(new Date(match.fixture.date))}
                    </p>
                  </div>
                  <div className={styles.matchBody}>
                    <div className={styles.home}>
                      <img
                        src={`${match.teams.home.logo}`}
                        alt={`${match.teams.home.name}`}
                      />
                      <p>{match.teams.home.name}</p>
                    </div>
                    <div className={styles.matchBodySeparator}>
                      <p>v</p>
                      {/* <MatchStatus status={match.fixture.status.short}  /> */}
                    </div>
                    <div className={styles.away}>
                      <img
                        src={`${match.teams.away.logo}`}
                        alt={`${match.teams.away.name}`}
                      />
                      <p>{match.teams.away.name}</p>
                    </div>
                  </div>
                  <div className={styles.additionalDetails}>
                    <div className={styles.matchStatus}>
                      <p>{match.fixture.status.long}</p>
                      <p>
                        {match.fixture.status.short === "FT"
                          ? match.teams.home.winner
                            ? `${match.teams.home.name} won!`
                            : match.teams.away.winner
                            ? `${match.teams.away.name} won!`
                            : `Draw!`
                          : ""}
                      </p>
                    </div>
                    <div className={styles.matchEntries}>
                      <h1>Predictions</h1>
                      <table>
                        <thead>
                          <tr>
                            <th>Home Win</th>
                            <th>The Draw</th>
                            <th>Away Win</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Home Entries</td>
                            <td>Draw Entries</td>
                            <td>Away Entries</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}
