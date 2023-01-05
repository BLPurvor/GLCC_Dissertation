import Image from "next/image";
import loStyles from "../styles/Landing.module.scss";
import liStyles from "../styles/Home.module.scss";

import Header from "../components/Header";

import imgLogo from "../assets/brand/logo.png";
import imgLogin from "../assets/shared/login.svg";
import imgLoading from "../assets/shared/loading.svg";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Nav from "../components/Nav";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className={loStyles.loading}>
        <Image
          className={loStyles.logo}
          src={imgLogo}
          alt="Gregson Lane Cricket Club Logo"
        />
        <Image
          className={loStyles.spinner}
          src={imgLoading}
          alt="Loading spinner"
        />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    return (
      <div className={liStyles.container}>
        <Header />
        <h1>Logged In</h1>
        <Link href="api/auth/logout">Log out</Link>
      </div>
    );
  }

  if (!user) {
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
