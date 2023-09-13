import fetch from "node-fetch";
import "dotenv/config";
import logger from "./logger.js";

const DMMS_API_KEY = process.env.DMMS_API_KEY;
const DMMS_URL = process.env.DMMS_URL;

const config = {
  method: "POST",
  headers: {
    Authorization: DMMS_API_KEY,
    "Content-Type": "application/json",
  },
};

export default async function cronJob() {
  try {
    const res = await fetch(DMMS_URL + "/crons/test", config);
    const { data } = await res.json();
    logger.log("info", data);
  } catch (error) {
    console.log("Error while executing specific cron", error.message);
  }
}
