import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

import styles from "../../styles/volunteer/index.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Custom404 from "../404";

export const getServerSideProps = withPageAuthRequired();

export default function Volunteer() {
  const { user, isLoading } = useUser();

  if (!user || !user.sub) return <Custom404 />;
  if (isLoading) return <Loading />;

  const user_id: string = user.sub.substring(user.sub.indexOf("|") + 1);

  return (
    <Layout user_id={user_id}>
      <div className={styles.container}>
        <h1>Volunteer's Hub</h1>
        <div className={styles.cntButtons}>
          <Link href="/volunteer/coupon">
            <button>Football Coupon</button>
          </Link>
          <button>Placeholder</button>
        </div>
      </div>
    </Layout>
  );
}
