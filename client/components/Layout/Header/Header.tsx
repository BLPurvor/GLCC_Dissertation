import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import imgLogo from "../../../assets/brand/logo.png";
import imgUser from "../../../assets/shared/user.svg";
import Nav from "./Nav";
import AccountPopover from "./AccountPopover";

import styles from "./Header.module.scss";

interface HeaderProps {
  user_id: string;
  role: string;
}

export default function Header({ user_id, role }: HeaderProps) {
  const [burgerStatus, setBurgerStatus] = useState(false); // Status of nav menu
  const [accountStatus, setAccountStatus] = useState(false); // Status of account menu

  return (
    <div className={styles.container}>
      <div className={styles.wrapBurger}>
        <button
          className={styles.iconBurger}
          type="button"
          onClick={() => setBurgerStatus(!burgerStatus)} // Set status to inverse of current status. Effective on/off switch
        >
          <div className={styles.iconB1} data-status={burgerStatus}></div>
          <div className={styles.iconB2} data-status={burgerStatus}></div>
          <div className={styles.iconB3} data-status={burgerStatus}></div>
          {/* Use div elements to create responsively styled burger menu display. */}
        </button>
        <Nav active={burgerStatus} role={role} />{" "}
        {/* Call external Nav component which houses navigation menu */}
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
        onClick={() => setAccountStatus(!accountStatus)} // Invert status of account menu
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
        statusChange={(value: boolean) => setAccountStatus(value)} // Change in structure of component in order to allow a child element of the component to manipulate the status
      />
    </div>
  );
}
