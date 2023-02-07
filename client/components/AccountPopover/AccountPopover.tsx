import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Loading from "../Loading";

import styles from "./AccountPopover.module.scss";

export const getServerSideProps = withPageAuthRequired();

type PopoverProps = {
  state: boolean;
};

export default function AccountPopover({ state }: PopoverProps) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className={styles.container} data-status={state} id="dropdownMenu">
      <Link href="/account/:id">Account Details</Link>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  );
}
