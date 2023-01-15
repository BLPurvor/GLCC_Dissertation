import mongoose from "mongoose";
import config from "../src/config";

export const dbConn = () => {
  mongoose
    .set("strictQuery", true)
    .connect(config.mongo.url)
    .then(() => {
      console.info("Successful DB Connection");
    })
    .catch((error) => {
      console.error("Failed to connect to DB");
      console.error(error);
    });
};
