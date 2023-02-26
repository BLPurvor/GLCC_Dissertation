import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

import styles from "../../styles/games/index.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export const getServerSideProps = withPageAuthRequired();

export default function Games() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  const user_id: string = user!.sub!.substring(user!.sub!.indexOf("|") + 1);

  return (
    <Layout user_id={user_id}>
      <div className={styles.container}>
        <h1 className={styles.txtHeader}>Games</h1>
        <div className={styles.gamesHousing}>
          <Link href="/games/coupon">
            <button
              className={`${styles.gameButton} ${styles.btnOdd}`}
              id={styles.coupon}
            >
              <span>Predictor</span>
            </button>
          </Link>
          {/* <Link href=""> */}
          <button
            className={`${styles.gameButton} ${styles.btnEven}`}
            id={styles.placeholder}
          >
            <span>Fantasy League</span>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </Layout>
  );
}
