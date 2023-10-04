import fetch from "node-fetch";
import "dotenv/config";
import logger from "./logger.js";
import { depositReminderUrl } from "./urls.js";

const LMS_API_KEY = process.env.LMS_API_KEY;
const LMS_URL = process.env.LMS_URL;

const config = {
  method: "POST",
  headers: {
    Authorization: LMS_API_KEY,
    "Content-Type": "application/json",
  },
};

export default async function depositReminder() {
  try {
    const res = await fetch(LMS_URL + depositReminderUrl, config);
    const { data } = await res.json();
    // logger.log("info", data);
  } catch (error) {
    console.log("Error while executing specific cron in lms", error.message);
  }
}
