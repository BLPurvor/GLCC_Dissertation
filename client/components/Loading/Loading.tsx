import Image from "next/image";

import styles from "./Loading.module.scss";

import imgLogo from "../../assets/brand/logo.png";
import imgLoading from "../../assets/shared/loading.svg";

export default function Loading() {
  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src={imgLogo}
        alt="Gregson Lane Cricket Club Logo"
      />
      <Image
        className={styles.spinner}
        src={imgLoading}
        alt="Loading spinner"
      />
    </div>
  );
}
