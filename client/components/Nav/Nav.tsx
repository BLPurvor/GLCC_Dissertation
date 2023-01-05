import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Nav.module.scss";

export default function Nav({ active }: { active: boolean }) {
  const router = useRouter();

  return (
    <nav className={styles.container} data-status={active}>
      <Link
        className={
          router.pathname === "/"
            ? `${styles.navLink} ${styles.activeLink}`
            : `${styles.navLink}`
        }
        id="Home"
        href="/"
      >
        Home
      </Link>
      <div className={styles.navSeparator}></div>
      <Link
        className={
          router.pathname === "/games/*"
            ? `${styles.navLink} ${styles.activeLink}`
            : `${styles.navLink}`
        }
        id="Games"
        href="/games"
      >
        Games
      </Link>
      <div className={styles.navSeparator} />
      <Link
        className={
          router.pathname === "/about/*"
            ? `${styles.navLink} ${styles.activeLink}`
            : `${styles.navLink}`
        }
        id="About"
        href="/about"
      >
        About Us
      </Link>{" "}
      <div className={styles.navSeparator} />
      <Link
        className={
          router.pathname === "/contact-us/*"
            ? `${styles.navLink} ${styles.activeLink}`
            : `${styles.navLink}`
        }
        id="Contact"
        href="/contact-us"
      >
        Contact Us
      </Link>
    </nav>
  );
}
