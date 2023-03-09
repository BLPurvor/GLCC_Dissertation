import Layout from "../../../components/Layout";

import { Gameweek } from "../../../types/gameweek";
import { Fixture } from "../../../types/fixture";
import styles from "../../../styles/volunteer/coupon/[gameweek_id].module.scss";

import { useState } from "react";
import axios from "axios";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getDefaultServerProps } from "../../../scripts/serverSideProps";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const user_id = await getDefaultServerProps(ctx);
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
        user_id,
      },
    };
  },
});

interface Gameweek_IdProps {
  gameweek: Gameweek;
  matches: Fixture[];
  user_id: string;
}

export default function Gameweek_Id({
  gameweek,
  matches,
  user_id,
}: Gameweek_IdProps) {
  const [resultState, setResultState] = useState({ code: 0, message: "" });

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
