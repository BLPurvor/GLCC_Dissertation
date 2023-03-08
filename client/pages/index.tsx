import { useUser } from "@auth0/nextjs-auth0/client";

import Image from "next/image";
import Link from "next/link";

import loStyles from "../styles/Landing.module.scss";
import liStyles from "../styles/Home.module.scss";

import imgLogo from "../assets/brand/logo.png";
import imgLogin from "../assets/shared/login.svg";

import Loading from "../components/Loading";
import Layout from "../components/Layout";
import React from "react";
import Custom404 from "./404";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loading />;

  if (error) return <Custom404 />;

  if (user && user.sub) {
    const user_id: string = user.sub.substring(user!.sub!.indexOf("|") + 1);

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

  if (!user || !user.sub) {
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
