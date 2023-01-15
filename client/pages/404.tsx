import Image from "next/image";

import styles from "../styles/404.module.scss";

import imgStumped from "../assets/shared/stumped.svg"; //Needs updating
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Custom404() {
  const { user, error, isLoading } = useUser();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Image
          className={styles.imgStumped}
          src={imgStumped}
          alt="Broken Stumps"
        />
        <div className={styles.txtBundle}>
          <h1 className={styles.txtHeader}>Stumped!</h1>
          <p className={styles.txtBody}>
            We couldn't find that page.
            <br />
            Please try again later.
          </p>
        </div>
        <button className={styles.btnReturn}>
          <a href="/">Go Home</a>
        </button>
      </div>
    </div>
  );
}
