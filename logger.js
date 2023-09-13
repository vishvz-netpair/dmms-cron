import { createLogger, format } from "winston";
import D from "winston-daily-rotate-file";
const { json } = format;

const daily = new D({
  filename: "data-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  dirname: "logs/",
  zippedArchive: true,
  maxSize: "1m",
  maxFiles: "14d",
});

const logger = createLogger({
  format: json(),
  transports: [daily],
});

export default logger;
