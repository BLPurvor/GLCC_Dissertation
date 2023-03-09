import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { getDefaultServerProps } from "../../../scripts/serverSideProps";
import { Fixture } from "../../../types/fixture";
import { Gameweek } from "../../../types/gameweek";

import styles from "../../../styles/games/coupon/[gameweek_id].module.scss";
import Layout from "../../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import arrowLeft from "../../../assets/shared/arrowLeft.svg";
import disabledArrowLeft from "../../../assets/shared/disabledArrowLeft.svg";
import arrowRight from "../../../assets/shared/arrowRight.svg";
import disabledArrowRight from "../../../assets/shared/disabledArrowRight.svg";
import ViewEntryComponent from "../../../components/coupon/ViewEntryComponent";
import { Entry } from "../../../types/entry";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const user_id = await getDefaultServerProps(ctx);
    const { gameweek_id: g_id } = ctx.query;

    const gwDataURL = `http://localhost:3001/gameweek/${g_id}`;
    const gwData = await axios.get(gwDataURL).then((res) => res);

    const listURL = `http://localhost:3001/matches/list/${gwData.data.matches}`;
    const listData = await axios.get(listURL).then((res) => res);

    const entryURL = `http://localhost:3001/entry/byUser/${g_id}/${user_id}`;
    const entryData = await axios.get(entryURL).then((res) => res);

    return {
      props: {
        user_id,
        gwData: gwData.data,
        gwStatus: gwData.status,
        matches: listData.data.response,
        prediction: entryData.data,
      },
    };
  },
});

interface Gameweek_IdProps {
  user_id: string;
  gwData: Gameweek;
  gwStatus: number;
  matches: Fixture[];
  prediction: Entry["prediction"];
}

export default function Gameweek_Id({
  user_id,
  gwData,
  gwStatus,
  matches,
  prediction,
}: Gameweek_IdProps) {
  return (
    <Layout user_id={user_id}>
      <div className={styles.container}>
        <h1 className={styles.txtHeader}>Football Predictor</h1>
        <div className={styles.gwContainer}>
          <div className={styles.headerBar}>
            <Link
              href={
                gwData.id - 1 > 0
                  ? `/games/coupon/${gwData.id - 1}`
                  : `/games/coupon/${gwData.id}`
              }
            >
              <Image
                className={styles.navArrow}
                src={gwData.id - 1 > 0 ? disabledArrowLeft : arrowLeft}
                alt="Go back a round."
              />
            </Link>
            <h1 className={styles.gwHeader}>Round {gwData.id}</h1>
            <Link href={`/games/coupon/${gwData.id + 1}`}>
              <Image
                className={styles.navArrow}
                src={arrowRight}
                alt="Go forward a round."
              />
            </Link>
          </div>
          <div className={styles.deadline}>
            <h1 className={styles.deadlineHeader}>Entry Deadline</h1>
            <p className={styles.deadlineBody}>
              {new Intl.DateTimeFormat("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                weekday: "long",
                day: "numeric",
                month: "long",
              }).format(new Date(gwData.deadline))}
            </p>
          </div>
          <div className={styles.matchesContainer}>
            {matches.map((match) => {
              return (
                <ViewEntryComponent match={match} prediction={prediction} />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
