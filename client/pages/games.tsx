import Loading from "../components/Loading";
import Layout from "../components/Layout";

import styles from "../styles/Games.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

export default function Games() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.txtHeader}>Games</h1>
        <div className={styles.gamesHousing}>
          <a href="/games/coupon">
            <button className={styles.gameButton} id={styles.coupon}>
              Coupon
            </button>
          </a>
        </div>
      </div>
    </Layout>
  );
}
