// import Loading from "../../../components/Loading";
// import Layout from "../../../components/Layout";
// import Custom404 from "../../404";

// import { Fixture } from "../../../types/fixture";
// import styles from "../../../styles/volunteer/coupon/[gameweek_id].module.scss";

// import { useState } from "react";
// import useSWR from "swr";
// import axios from "axios";

// import { useUser } from "@auth0/nextjs-auth0/client";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0";

// export const getServerSideProps = withPageAuthRequired();

// export default function Gameweek_Id() {
//   const [resultState, setResultState] = useState({ code: 0, message: "" });

//   const { user, isLoading } = useUser();

//   if (!user || !user.sub) return <Custom404 />;
//   if (isLoading) return <Loading />;

//   const user_id: string = user.sub.substring(user.sub.indexOf("|") + 1);
