import Loading from "../components/Loading";
import Layout from "../components/Layout";

import styles from "../styles/About.module.scss";
import twos_2022 from "../assets/gallery/twos/team_photo_2022.png";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

export default function About() {
  const { user, error, isLoading } = useUser();
  const user_id: string = user!.sub!.substring(user!.sub!.indexOf("|") + 1);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout user_id={user_id}>
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
          <h2>The 1st XI</h2>
          {/* <Image */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            sollicitudin ante consectetur commodo eleifend. Suspendisse urna
            libero, tincidunt tincidunt dui non, pretium auctor odio.
            <br />
            Nunc enim neque, lobortis sed consequat at, posuere eget orci. In a
            nisi quam. Aenean convallis porta turpis maximus porttitor. Nunc
            rutrum, lectus nec faucibus condimentum, quam magna interdum erat,
            at maximus metus nibh non odio.
          </p>
        </article>
        <article id="SecondTeam">
          <h2 className={styles.artHeader}>The 2nd XI</h2>
          <Image
            src={twos_2022}
            alt="Gregson Lane Second Team 2021/22 Season"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            sollicitudin ante consectetur commodo eleifend. Suspendisse urna
            libero, tincidunt tincidunt dui non, pretium auctor odio.
            <br />
            Nunc enim neque, lobortis sed consequat at, posuere eget orci. In a
            nisi quam. Aenean convallis porta turpis maximus porttitor. Nunc
            rutrum, lectus nec faucibus condimentum, quam magna interdum erat,
            at maximus metus nibh non odio.
          </p>
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
            picked the game up, the Sunday team welcomes players of any ability
            - if you can stand up to a bit of sledging!
          </p>
        </article>
      </div>
    </Layout>
  );
}
