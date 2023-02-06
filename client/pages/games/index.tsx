import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

import styles from "../../styles/Games.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { userInfoFetch, walletInfoFetch } from "../../scripts/userInfo";
import useSWR from "swr";

export const getServerSideProps = withPageAuthRequired();

export default function Games() {
  const { user, isLoading } = useUser();
  const user_id: string = user!.sub!.substring(user!.sub!.indexOf("|") + 1);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout user_id={user_id}>
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
