import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Nav.module.scss";

export default function Nav({
  active,
  role,
}: {
  active: boolean;
  role: string;
}) {
  const router = useRouter();

  if (role === "admin" || role === "volunteer") {
    var visible = true;
  } else {
    var visible = false;
  }

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
          router.pathname.startsWith("/games")
            ? `${styles.navLink} ${styles.activeLink}`
            : `${styles.navLink}`
        }
        id="Games"
        href="/games"
      >
        Games
      </Link>
      {visible ? (
        <>
          <div className={styles.navSeparator}> </div>
          <Link
            className={
              router.pathname.startsWith("/volunteer")
                ? `${styles.navLink} ${styles.activeLink}`
                : `${styles.navLink}`
            }
            id="Volunteer"
            href="/volunteer"
          >
            Volunteer Portal
          </Link>
        </>
      ) : null}
      {/* <div className={styles.navSeparator} />
      <Link
        className={
          router.pathname.startsWith("/about")
            ? `${styles.navLink} ${styles.activeLink}`
            : `${styles.navLink}`
        }
        id="About"
        href="/about"
      >
        About Us
      </Link>
      <div className={styles.navSeparator} />
      <Link
        className={
          router.pathname.startsWith("/contact-us")
            ? `${styles.navLink} ${styles.activeLink}`
            : `${styles.navLink}`
        }
        id="Contact"
        href="/contact-us"
      >
        Contact Us
      </Link> */}
    </nav>
  );
}
