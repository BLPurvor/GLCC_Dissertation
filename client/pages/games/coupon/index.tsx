import Layout from "../../../components/Layout";
import { Gameweek } from "../../../types/gameweek";
import { Fixture } from "../../../types/fixture";

import styles from "../../../styles/games/coupon/index.module.scss";
import arrowLeft from "../../../assets/shared/arrowLeft.svg";
import arrowRight from "../../../assets/shared/arrowRight.svg";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import EntryComponent from "../../../components/coupon/EntryComponent";
import { Entry } from "../../../types/entry";
import { v4 as uuidv4 } from "uuid";
import { getDefaultServerProps } from "../../../scripts/serverSideProps";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const user_id = await getDefaultServerProps(ctx);

    const latestURL = "http://localhost:3001/gameweek/latest";
    const latestGameweek: AxiosResponse<Gameweek> = await axios
      .get(latestURL)
      .then((res) => res);

    let gwStatus = latestGameweek.status;
    let gwData = latestGameweek.data;
    let matchDetails: Fixture[] | null = null;

    if (gwStatus === 200) {
      let matches = gwData.matches;
      const gwURL = `http://localhost:3001/matches/list/${matches}`;

      matchDetails = await axios.get(gwURL).then((res) => res.data.response);
      if (matchDetails === null || matchDetails.length === 0) {
        gwStatus = 204;
      }
    }

    const prevEntryURL = `http://localhost:3001/entry/byUser/${gwData.id}/${user_id}`;
    const prevEntryRequest: AxiosResponse<Entry["prediction"]> = await axios
      .get(prevEntryURL)
      .then((res) => res);

    let prevEntry = prevEntryRequest.data;

    return {
      props: {
        gwData,
        gwStatus,
        matchDetails,
        user_id,
        prevEntry,
      },
    };
  },
});
// };

interface CouponProps {
  gwData: Gameweek;
  gwStatus: number;
  matchDetails: Fixture[] | null;
  user_id: string;
  prevEntry: Entry["prediction"];
}

export default function Coupon({
  gwData,
  gwStatus,
  matchDetails,
  user_id,
  prevEntry,
}: CouponProps) {
  const [isEntryComplete, setIsEntryComplete] = useState(false);

  switch (gwStatus) {
    case 204:
      return (
        <Layout user_id={user_id}>
          <div className={styles.container}>
            <h1 className={styles.txtHeader}>Football Predictor</h1>
            <div className={styles.errorContainer}>
              <h1 className={styles.errHeader}>Error {gwStatus}</h1>
              <p>
                We couldn't find any information for this page, which means
                something has probably gone wrong. Please contact your
                administrator.
              </p>
            </div>
          </div>
        </Layout>
      );

    case 500:
      return (
        <Layout user_id={user_id}>
          <div className={styles.container}>
            <h1 className={styles.txtHeader}>Football Predictor</h1>
            <div className={styles.errorContainer}>
              <h1 className={styles.errHeader}>Error {gwStatus}</h1>
              <p>
                Something went wrong. It's probably our fault. Please contact
                your adminstrator.
              </p>
            </div>
          </div>
        </Layout>
      );

    default:
      break;
  }

  if (!matchDetails || matchDetails === null) {
    return (
      <Layout user_id={user_id}>
        <div className={styles.container}>
          <h1 className={styles.txtHeader}>Football Predictor</h1>
          <div className={styles.errorContainer}>
            <h1 className={styles.errHeader}>Error {gwStatus}</h1>
            <p>
              We couldn't find any information for this page, which means
              something has probably gone wrong. Please contact your
              administrator.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let entryNodeList = document.querySelectorAll(
      "input[type='radio']:checked"
    );

    let entryArray = Array.from(entryNodeList) as HTMLInputElement[];
    // Array needs to be typecast to the correct type. TypeScript infers type Element[] which doesn't contain value or name attributes

    let prediction: Entry["prediction"] = [];
    // Assert that the prediction array must be this specific format. More data will be added to an object to fulfill the total
    // requirements of type Entry

    entryArray.forEach((match) => {
      prediction.push({
        match_id: parseInt(match.name),
        prediction: match.value,
      });
    });

    let entry: Entry = {
      _id: uuidv4(),
      datetime: new Date().toISOString(),
      user_id: user_id,
      won: false,
      gameweek_id: gwData.id,
      prediction: prediction,
    };

    const entryURL = "http://localhost:3001/entry/submit";
    const result = await axios.post(entryURL, { entry }).then((res) => res);
  };

  const handleChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let entry = document.querySelectorAll("input[type='radio']:checked");

    entry.length != 8 ? setIsEntryComplete(false) : setIsEntryComplete(true);
  };

  return (
    <Layout user_id={user_id}>
      <div className={styles.container}>
        <h1 className={styles.txtHeader}>Football Predictor</h1>
        <div className={styles.gwContainer}>
          <div className={styles.headerBar}>
            <Link href={`/games/coupon/${gwData.id - 1}`}>
              <Image
                className={styles.navArrow}
                src={arrowLeft}
                alt="Go back a round."
              />
            </Link>
            <h1 className={styles.gwHeader}>Round {gwData.id}</h1>
            <Image
              className={`${styles.navArrow} ${styles.disabledArrow}`}
              src={arrowRight}
              alt="Go forward a round."
            />
          </div>
          <form
            id="entryForm"
            className={styles.matchForm}
            onSubmit={handleSubmit}
            onChange={handleChange}
          >
            <button
              className={styles.btnSubmit}
              type="submit"
              disabled={!isEntryComplete}
            >
              Submit Entry
            </button>
            {matchDetails.map((match) => {
              return <EntryComponent match={match} />;
            })}
          </form>
        </div>
      </div>
    </Layout>
  );
}
