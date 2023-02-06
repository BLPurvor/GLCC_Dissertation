import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

import styles from "../../styles/games/Coupon.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

export default function Coupon() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  const user_id: string = user!.sub!.substring(user!.sub!.indexOf("|") + 1);

  return (
    <Layout user_id={user_id}>
      <div className={styles.container}>
        <h1 className={styles.txtHeader}>Coupon</h1>
        <h1>{user_id}</h1>
      </div>
    </Layout>
  );
}
