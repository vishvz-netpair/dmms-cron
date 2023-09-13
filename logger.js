import { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { json } = format;

const dailyRotateInfo = new DailyRotateFile({
  filename: "data-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  dirname: "logs/",
  zippedArchive: true,
  maxSize: "1m",
  maxFiles: "14d",
});

const logger = createLogger({
  format: json(),
  transports: [dailyRotateInfo],
});

export default logger;
