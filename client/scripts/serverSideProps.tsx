import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";

export const getDefaultServerProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx.req, ctx.res);
  const user_id: string = session?.user.sub.substring(
    session.user.sub.indexOf("|") + 1
  );

  return user_id;
};
