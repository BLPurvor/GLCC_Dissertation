import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import styles from "../../styles/Account.module.scss";

const Account = () => {
  const router = useRouter();
  const { _id: user_id } = router.query;

  return <div className={styles.container}>{user_id}</div>;
};

export default Account;
