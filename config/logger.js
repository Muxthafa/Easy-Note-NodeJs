const {createLogger,transports,format } = require('winston')
require("winston-daily-rotate-file");
const logger = createLogger({
    format: format.combine(format.timestamp(),format.json()),
    defaultMeta: { service: 'user-service' },
    transports: new transports.DailyRotateFile({
        filename: "logs/log-%DATE%.log",
        datePattern: "DD-MM-YYYY",
      })
  });

module.exports = logger;