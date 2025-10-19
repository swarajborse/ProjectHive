import pino from "pino";

const logger = pino({
  levels: "info",
});

export default logger;
