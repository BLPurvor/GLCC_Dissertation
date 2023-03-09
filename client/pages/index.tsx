import Image from "next/image";
import Link from "next/link";

import loStyles from "../styles/Landing.module.scss";
import liStyles from "../styles/Home.module.scss";

import imgLogo from "../assets/brand/logo.png";
import imgLogin from "../assets/shared/login.svg";

import Layout from "../components/Layout";
import React from "react";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getDefaultServerProps } from "../scripts/serverSideProps";

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

interface HomeProps {
  user_id: string;
}

export default function Home({ user_id }: HomeProps) {
  console.log(user_id);
  if (user_id) {
    return (
      <div className={liStyles.container}>
        <Layout user_id={user_id}>
          <React.Fragment>
            <h1>Logged In</h1>
            <Link href="api/auth/logout">Log out</Link>
          </React.Fragment>
        </Layout>
      </div>
    );
  }

  if (!user_id) {
    return (
      <div className={loStyles.loggedOut}>
        <div className={loStyles.divLogin}>
          <Image
            className={loStyles.logo}
            src={imgLogo}
            alt="Gregson Lane Cricket Club Logo"
          />
          <Link href="api/auth/login">
            <button className={loStyles.button}>
              <span className={loStyles.btnText}>Log In</span>
              <Image
                className={loStyles.btnIcon}
                src={imgLogin}
                alt="Log in icon"
              />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
