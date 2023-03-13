import Header from "./Header";
import Footer from "./Footer";

import styles from "./layout.module.scss";

import { walletInfoFetch, userInfoFetch } from "../../scripts/userInfo";

import React, { ReactNode } from "react";
import useSWR from "swr";
import Loading from "../Loading";
import Custom404 from "../../pages/404";

interface LayoutProps {
  children?: ReactNode;
  user_id: string;
}

/*
 *   Layout component is handled by the framework, which is produced as a wrapper to contain the content of each page without requiring a significant
 *   amount of code to be rewritten for each page.
 */

export default function Layout({ children, user_id }: LayoutProps) {
  const {
    data: wallet_data,
    error: wallet_error,
    isLoading: wallet_loading,
  } = useSWR(`http://localhost:3001/wallet/${user_id}`, walletInfoFetch);
  // No wallet data is currently used, however, inclusion of the wallet data does not affect the application in a significant way

  const {
    data: user_data,
    error: user_error,
    isLoading: user_loading,
  } = useSWR(`http://localhost:3001/user/${user_id}`, userInfoFetch);
  // Hook collects user data and passes a pending status to the client in order to give a status to the user.

  if (wallet_loading || user_loading) return <Loading />;
  if (
    wallet_error ||
    wallet_data === undefined ||
    user_error ||
    user_data === undefined
  ) {
    return <Custom404 />;
  }

  return (
    <div className={styles.container}>
      <Header user_id={user_id} role={user_data.role} />
      <main>{children}</main>
      <Footer accountValue={wallet_data.cash_value} />
    </div>
  );
}
