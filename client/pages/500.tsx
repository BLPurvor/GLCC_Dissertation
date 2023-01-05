import Image from "next/image";

import styles from "../styles/500.module.scss";

import imgStumped from "../assets/shared/stumped.svg"; //Needs updating

export default function Custom500() {
  return (
    <div className={styles.container}>
      <Image src={imgStumped} alt="Broken Stumps" />
      <h1 className={styles.txtHeader}>Stumped!</h1>
      <h2 className={styles.txtCode}>500 Error</h2>
      <p className={styles.txtBody}>
        A server-side error occurred. Please contact your administrator.
      </p>
      <button className={styles.btnReturn}>
        <a href="/">Go Back</a>
      </button>
    </div>
  );
}
