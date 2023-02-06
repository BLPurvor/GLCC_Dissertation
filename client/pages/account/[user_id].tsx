import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import useSWR from "swr";
import { userInfoFetch } from "../../scripts/userInfo";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import styles from "../../styles/account/Account.module.scss";
import { useUser } from "@auth0/nextjs-auth0/client";

export const getServerSideProps = withPageAuthRequired();

export default function Account() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />;

  const user_id: string = user!.sub!.substring(user!.sub!.indexOf("|") + 1);

  const {
    data: user_data,
    error: user_error,
    isLoading: user_loading,
  } = useSWR(`http://localhost:3001/user/${user_id}`, userInfoFetch);

  if (user_loading) return <Loading />;
  if (user_error) return;

  return (
    <Layout user_id={user_id?.toString()!}>
      <div className={styles.container}>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.keys(user_data).map((key) => {
            return (
              <div className={styles.inputGroup}>
                <label htmlFor={key}>{`${key}: `}</label>
                <input
                  key={key}
                  type="text"
                  name={key}
                  id={key}
                  defaultValue={user_data[key]}
                />
              </div>
            );
          })}
        </form>
      </div>
    </Layout>
  );
}
