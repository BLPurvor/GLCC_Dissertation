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

  // If the user is not an admin or volunteer, hide the option to access the volunteer portal.
  if (role === "admin" || role === "volunteer") {
    var visible = true;
  } else {
    var visible = false;
  }

  function handleVisibility(visible: boolean): JSX.Element | null {
    if (!visible) {
      return null;
    }

    return (
      <>
        <div className={styles.navSeparator}></div>
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
    );
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
      {handleVisibility(visible)}
    </nav>
  );
}
