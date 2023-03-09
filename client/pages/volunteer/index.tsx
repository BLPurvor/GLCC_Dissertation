import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

import styles from "../../styles/volunteer/index.module.scss";

import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Custom404 from "../404";
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

interface VolunteerProps {
  user_id: string;
}

export default function Volunteer({ user_id }: VolunteerProps) {
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
