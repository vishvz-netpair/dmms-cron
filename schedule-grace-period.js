import fetch from "node-fetch";
import "dotenv/config";
import logger from "./logger.js";
import { scheduleGracePeriodUrl } from "./urls.js";

const DMMS_API_KEY = process.env.DMMS_API_KEY;
const DMMS_URL = process.env.DMMS_URL;

const config = {
  method: "POST",
  headers: {
    Authorization: DMMS_API_KEY,
    "Content-Type": "application/json",
  },
};

export default async function scheduleGracePeriod() {
  try {
    const res = await fetch(DMMS_URL + scheduleGracePeriodUrl, config);
    const { data } = await res.json();
    logger.log("info", data);
    return;
  } catch (error) {
    console.log(
      "Error while executing specific cron scheduleGracePeriod: ",
      error.message
    );
    return;
  }
}
