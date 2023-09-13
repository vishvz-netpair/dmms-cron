import e from "express";
import c from "node-cron";
import "dotenv/config";
import cronJob from "./cron-job.js";

const app = e();

const cronOpts = { timezone: "Asia/Kolkata" };

c.schedule(
  "00 10 * * *",
  () => {
    try {
      cronJob();
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
