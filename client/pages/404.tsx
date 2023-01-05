import Image from "next/image";

import styles from "../styles/404.module.scss";

import imgStumped from "../assets/shared/stumped.svg"; //Needs updating

export default function Custom404() {
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
