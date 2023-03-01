import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import imgLogo from "../../assets/brand/logo.png";
import imgUser from "../../assets/shared/user.svg";
import Nav from "../Nav";
import AccountPopover from "../AccountPopover";

import styles from "./Header.module.scss";

interface HeaderProps {
  user_id: string;
  role: string;
}

export default function Header({ user_id, role }: HeaderProps) {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [accountStatus, setAccountStatus] = useState(false);

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
        <Nav active={burgerStatus} role={role} />
      </div>
      <Link href="/">
        <Image
          className={styles.imgLogo}
          src={imgLogo}
          alt="Gregson Lane CC Logo"
        />
      </Link>
      <button
        id="dropdownToggle"
        onClick={() => setAccountStatus(!accountStatus)}
      >
        <Image
          className={styles.iconUser}
          src={imgUser}
          alt="Account Options Icon"
        />
      </button>
      <AccountPopover
        user_id={user_id}
        status={accountStatus}
        statusChange={(value: boolean) => setAccountStatus(value)}
      />
    </div>
  );
}
