import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { getDefaultServerProps } from "../../../scripts/serverSideProps";
import { Fixture } from "../../../types/fixture";
import { Gameweek } from "../../../types/gameweek";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const user_id = await getDefaultServerProps(ctx);
    const { gameweek_id: g_id } = ctx.query;

    const gwDataURL = `http://localhost:3001/gameweek/${g_id}`;
    const gwData = await axios.get(gwDataURL).then((res) => res);

    const listURL = `http://localhost:3001/matches/list/${gwData.data.matches}`;
    const listData = await axios.get(listURL).then((res) => res);

    return {
      props: {
        user_id,
        gameweek: gwData.data,
        gameweek_status: gwData.status,
        matches: listData.data.response,
      },
    };
  },
});

interface Gameweek_IdProps {
  user_id: string;
  gameweek: Gameweek;
  gameweek_status: number;
  matches: Fixture[];
}

export default function Gameweek_Id({
  user_id,
  gameweek,
  gameweek_status,
  matches,
}: Gameweek_IdProps) {
  console.log(matches);
}
