import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";

import CloseIcon from "../../../../assets/shared/close.svg";

import styles from "./AccountPopover.module.scss";

export const getServerSideProps = withPageAuthRequired();

type PopoverProps = {
  user_id: string;
  status: boolean;
  statusChange: Function;
};

export default function AccountPopover({
  user_id,
  status,
  statusChange,
}: PopoverProps) {
  return (
    <>
      <div
        className={styles.container}
        data-status={status}
        onClick={() => statusChange(!status)}
      >
        <div className={styles.menu} id="dropdownMenu">
          <button
            type="button"
            className={styles.btnClose}
            onClick={() => statusChange(!status)}
          >
            <Image src={CloseIcon} alt="Close" className={styles.iconClose} />
          </button>
          <Link href={`/account/${user_id}`}>Account Details</Link>
          <Link href="/api/auth/logout">Log Out </Link>
        </div>
      </div>
    </>
  );
}
