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
  if (user_id) {
    return (
      <Layout user_id={user_id}>
        <div className={liStyles.container}>
          <h1 className={liStyles.txtHeader}>Gregson Lane CC</h1>
          <div className={liStyles.body}>
            <h1 className={liStyles.bodyHeader}>Quick Links</h1>
            <div className={liStyles.quickLinks}>
              <Link href="/games/coupon">
                <button
                  className={`${liStyles.gameButton} ${liStyles.btnOdd}`}
                  id={liStyles.coupon}
                >
                  <span>Predictor</span>
                </button>
              </Link>
              <Link href={`/account/${user_id}`}>
                <button
                  className={`${liStyles.gameButton} ${liStyles.btnEven}`}
                  id={liStyles.account}
                >
                  <span>Your Account</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
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
