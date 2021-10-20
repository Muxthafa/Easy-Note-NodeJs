const {createLogger,transports,format } = require('winston')
require("winston-daily-rotate-file");

/**
 * createLogger method of winston is used to generate log messages
 * transports defines storage path
 * it can be configured at various levels
 */
const logger = createLogger({
    format: format.combine(format.timestamp(),format.json()),
    defaultMeta: { service: 'user-service' },
    transports: new transports.DailyRotateFile({
        filename: "logs/log-%DATE%.log",
        datePattern: "DD-MM-YYYY",
      })
  });

module.exports = logger;