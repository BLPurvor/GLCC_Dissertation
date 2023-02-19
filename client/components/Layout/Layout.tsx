import Header from "../Header";
import Footer from "../Footer";

import styles from "./layout.module.scss";

import { walletInfoFetch, userInfoFetch } from "../../scripts/userInfo";

import React, { ReactNode } from "react";
import useSWR from "swr";
import Loading from "../Loading";

interface LayoutProps {
  children?: ReactNode;
  user_id: string;
}

export default function Layout({ children, user_id }: LayoutProps) {
  const {
    data: wallet_data,
    error: wallet_error,
    isLoading: wallet_loading,
  } = useSWR(`http://localhost:3001/wallet/${user_id}`, walletInfoFetch);

  const {
    data: user_data,
    error: user_error,
    isLoading: user_loading,
  } = useSWR(`http://localhost:3001/user/${user_id}`, userInfoFetch);

  if (wallet_loading || user_loading) return <Loading />;

  return (
    <div className={styles.container}>
      <Header user_id={user_id} role={user_data.role} />
      <main>{children}</main>
      <Footer accountValue={wallet_data.cash_value} />
    </div>
  );
}
