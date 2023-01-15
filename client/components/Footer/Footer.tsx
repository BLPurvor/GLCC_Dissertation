import { useState } from "react";
import Image from "next/image";

import styles from "./Footer.module.scss";

import imgHome from "../../assets/shared/home.svg";

interface FooterProps {
  accountValue: number;
}

export default function Footer({ accountValue }: FooterProps) {
  const printValue = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(accountValue);

  return (
    <div className={styles.container}>
      <Image src={imgHome} alt="Home Icon" className={styles.iconHome} />
      <span className={styles.txtValue}>{printValue}</span>
    </div>
  );
}
