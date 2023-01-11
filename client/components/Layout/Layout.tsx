import Header from "../Header";
import Footer from "../Footer";

import styles from "./layout.module.scss";
import { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // const { data , error } = useSWR =>>> Recommended by Vercel (designed by same team).

  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      <Footer accountValue={10} />
    </div>
  );
}
