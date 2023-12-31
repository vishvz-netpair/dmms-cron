import e from "express";
import c from "node-cron";
import "dotenv/config";
import scheduleGracePeriod from "./schedule-grace-period.js";
import cancelBookRequest from "./cancel-book-request.js";
import depositReminder from "./deposit-reminder.js";

/**
 * Add DMMS_URL, DMMS_API_KEY, DMMS_CRON_EXPRESSION in env.
 */

const app = e();

const cronOpts = { timezone: "Asia/Kolkata" };

const DMMS_CRON_EXPRESSION = String(process.env.DMMS_CRON_EXPRESSION);
const LMS_CRON_EXPRESSION = String(process.env.LMS_CRON_EXPRESSION);

c.schedule(
  DMMS_CRON_EXPRESSION,
  () => {
    try {
      scheduleGracePeriod();
    } catch (error) {
      console.log(
        "Error while executing cron on " +
          new Date().toISOString() +
          " : " +
          error.message
      );
    }
  },
  cronOpts
);
c.schedule(
  LMS_CRON_EXPRESSION,
  () => {
    try {
      cancelBookRequest();
      depositReminder();
    } catch (error) {
      console.log(
        "Error while executing cron on " +
          new Date().toISOString() +
          " : " +
          error.message
      );
    }
  },
  cronOpts
);

(() => {
  try {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Cron server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server error occurred: ", error.message);
  }
})();
