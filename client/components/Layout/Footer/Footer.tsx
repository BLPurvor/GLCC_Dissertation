import Image from "next/image";

import styles from "./Footer.module.scss";

import imgHome from "../../../assets/shared/home.svg";
import Link from "next/link";

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
      <Link href="/" className={styles.iconHome}>
        <Image src={imgHome} alt="Home Icon" />
      </Link>
      <span className={styles.txtValue}>{printValue}</span>
    </div>
  );
}
