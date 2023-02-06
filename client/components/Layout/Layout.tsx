import Header from "../Header";
import Footer from "../Footer";

import useSWR from "swr";
import { userInfoFetch } from "../../scripts/userInfo";

import styles from "./layout.module.scss";
import React, { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
  user_id: string;
}

export default function Layout({ children, user_id }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Header user_id={user_id} />
      <main>{children}</main>
      <Footer accountValue={10} />
    </div>
  );
}
