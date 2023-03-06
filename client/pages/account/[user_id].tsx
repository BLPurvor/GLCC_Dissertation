import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import useSWR from "swr";
import { userInfoFetch } from "../../scripts/userInfo";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import styles from "../../styles/account/Account.module.scss";
import Custom404 from "../404";

import { useUser } from "@auth0/nextjs-auth0/client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  withPageAuthRequired();
  let { user_id } = ctx.query;

  const userDetails = await axios.get(`http://localhost:3001/user/${user_id}`);

  return {
    props: {
      userDetails: userDetails.data,
    },
  };
};
const handleUpdateDetails = async (
  e: FormEvent<HTMLFormElement>,
  setMessage: Function,
  setStatus: Function
) => {
  e.preventDefault();

  let url = "http://localhost:3001/user/update";
  let form = document.querySelector("#updateForm");

  const updateResult = await axios
    .post(url, form, { headers: { "Content-Type": "application/json" } })
    .then((response) => {
      let field = document.getElementById("password") as HTMLInputElement;
      field.value = "";
      return response;
    })
    .catch((error) => {
      let field = document.getElementById("password") as HTMLInputElement;
      field.value = "";
      return error.response;
    });

  setStatus(updateResult.status);
  setMessage(updateResult.data);

  return updateResult;
};

export default function Account({ userDetails }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [returnMsg, setReturnMsg] = useState("");
  const [returnStatus, setReturnStatus] = useState(undefined);

  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />;
  if (user === undefined) return <Custom404 />;

  const user_id: string = user.sub!.substring(user.sub!.indexOf("|") + 1);

  if (isDisabled) {
    var changes = "Make Changes";
  } else {
    var changes = "Cancel Changes";
  }

  return (
    <Layout user_id={user_id.toString()!}>
      <div className={styles.container}>
        <h1 className={styles.header}>Account Details</h1>
        <form
          onSubmit={(e) =>
            handleUpdateDetails(e, setReturnMsg, setReturnStatus)
          }
          id="updateForm"
        >
          <input
            type="hidden"
            id="user_id"
            name="user_id"
            value={user_id}
            readOnly
          />
          {Object.keys(userDetails).map((key) => {
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
                  readOnly={isDisabled}
                  type="text"
                  name={key}
                  id={key}
                  defaultValue={userDetails[key]}
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
          <div
            className={styles.ctnResult}
            data-status={returnStatus ? returnStatus : 0}
          >
            <h1>Status Code: {returnStatus}</h1>
            <p>{returnMsg}</p>
          </div>
          <div className={styles.btnGroup}>
            <button
              hidden={isDisabled}
              type="submit"
              onClick={() => {
                setIsDisabled(!isDisabled);
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
