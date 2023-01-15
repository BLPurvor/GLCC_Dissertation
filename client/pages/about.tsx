import Loading from "../components/Loading";
import Layout from "../components/Layout";

import styles from "../styles/About.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router from "next/router";
import Image from "next/image";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

export default function About() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.txtHeader}>About Us</h1>
        <p className={styles.txtMainDesc}>
          Gregson Lane Cricket Club - affectionately known as <em>The Lane</em>{" "}
          - is a village cricket team with three senior teams playing in the
          local Palace Shield competition.
          <br />
          Often referred to by its players as "more of a social club than a
          sports club", The Lane prides itself on containing players of varying
          experience and ability.
        </p>
        <article id="FirstTeam">
          <h2>
            The 1<sup>st</sup> XI
          </h2>
          {/* <Image */}
          <p></p>
        </article>
        <article id="SecondTeam">
          <h2 className={styles.artHeader}>
            The 2<sup>nd</sup> XI
          </h2>
          {/* <Image */}
          <p></p>
        </article>
        <article id="SundayTeam">
          <h2>The Sunday XI</h2>
          {/* <Image  */}
          <p>
            Competing in the Palace Shield's Sunday Division 2 South, The Lane's
            sunday team aims to provide players an entryway into the saturday
            teams.
            <br />
            Acting as a gateway for players from juniors to those who have just
            picked the game up, the Sunday team welcomes players of any ability.
          </p>
        </article>
      </div>
    </Layout>
  );
}
