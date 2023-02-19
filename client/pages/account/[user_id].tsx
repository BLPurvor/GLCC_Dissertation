import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import useSWR from "swr";
import { userInfoFetch } from "../../scripts/userInfo";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import styles from "../../styles/account/Account.module.scss";
import Custom404 from "../404";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import Error from "next/error";

// export const getServerSideProps = withPageAuthRequired();

export default function Account() {
  const [isDisabled, setIsDisabled] = useState(true);

  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />;
  if (user === undefined) return <Custom404 />;

  const user_id: string = user!.sub!.substring(user!.sub!.indexOf("|") + 1);

  if (isDisabled) {
    var changes = "Make Changes";
  } else {
    var changes = "Cancel Changes";
  }

  const {
    data: user_data,
    error: user_error,
    isLoading: user_loading,
  } = useSWR(`http://localhost:3001/user/${user_id}`, userInfoFetch);

  if (user_loading) return <Loading />;

  return (
    <Layout user_id={user_id?.toString()!}>
      <div className={styles.container}>
        <h1 className={styles.header}>Account Details</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.keys(user_data).map((key) => {
            let words = key.split("_");
            for (let i = 0; i < words.length; i++) {
              words[i] = words[i][0].toUpperCase() + words[i].substring(1);
            }
            let label = words.join(" ");

            if (label === "Role") return;
            if (label === "Email Verified") return;

            return (
              <div key={key} className={styles.inputGroup}>
                <label htmlFor={key}>{`${label}`}</label>
                <br />
                <input
                  disabled={isDisabled}
                  type="text"
                  name={key}
                  id={key}
                  defaultValue={user_data[key]}
                  placeholder={label}
                />
              </div>
            );
          })}
          <div
            key={"password"}
            className={styles.inputGroup}
            hidden={isDisabled}
          >
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className={styles.btnGroup}>
            <button
              hidden={isDisabled}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
              }}
              className={`${styles.btn} ${styles.btnSave}`}
            >
              Save Changes
            </button>
            <button
              type="button"
              id="changes"
              onClick={() => {
                setIsDisabled(!isDisabled);
              }}
              className={
                isDisabled
                  ? `${styles.btn} ${styles.btnMake}`
                  : `${styles.btn} ${styles.btnCancel}`
              }
            >
              {changes}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
