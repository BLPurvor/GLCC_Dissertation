import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

import Logo from "../assets/logo.png";

import { useUser } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    return (
      <>
        <h1>Hello, {user.nickname}!</h1>
        <a href="/api/auth/logout">Logout</a>
      </>
    );
  }

  return (
    <div className={styles.landingDiv}>
      <Image className={""} src={Logo} alt="Gregson Lane Cricket Club Logo" />
      <a href="api/auth/login">
        <button>Log In</button>
      </a>
      {/* <div className={""} />
      <a href="api/auth/signup">
        <button>Register</button>
      </a> */}
    </div>
  );
}
