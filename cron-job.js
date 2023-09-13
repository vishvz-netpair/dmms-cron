import fetch from "node-fetch";
import "dotenv/config";
import logger from "./logger.js";

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const config = {
  method: "POST",
  headers: {
    Authorization: API_KEY,
    "Content-Type": "application/json",
  },
};

export default async function cronJob() {
  try {
    const res = await fetch(URL + "/crons/test", config);
    const { data } = await res.json();
    logger.log("info", data);
  } catch (error) {
    console.log("Error while executing specific cron", error.message);
  }
}
