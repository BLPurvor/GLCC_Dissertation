import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

import styles from "../../styles/games/index.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { getDefaultServerProps } from "../../scripts/serverSideProps";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const user_id = await getDefaultServerProps(ctx);

    return {
      props: {
        user_id,
      },
    };
  },
});
interface GamesProps {
  user_id: string;
}

export default function Games({ user_id }: GamesProps) {
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
