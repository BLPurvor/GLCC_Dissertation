import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import imgLogo from "../../assets/brand/logo.png";
import Home from "../../assets/shared/home";
import imgUser from "../../assets/shared/user.svg";
import Nav from "../Nav";

import styles from "./Header.module.scss";

export default function Header() {
  const [burgerStatus, setBurgerStatus] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.wrapBurger}>
        <button
          className={styles.iconBurger}
          type="button"
          onClick={() => setBurgerStatus(!burgerStatus)}
        >
          <div className={styles.iconB1}></div>
          <div className={styles.iconB2}></div>
          <div className={styles.iconB3}></div>
        </button>
        <Nav active={burgerStatus} />
      </div>
      <Link href="/">
        <Image
          className={styles.imgLogo}
          src={imgLogo}
          alt="Gregson Lane CC Logo"
        />
      </Link>
      <Link href="/account">
        <Image
          className={styles.iconUser}
          src={imgUser}
          alt="Account Options Icon"
        />
      </Link>
    </div>
  );
}
