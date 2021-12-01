/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : generates log messages                 
 * 
 * @file            : logger.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const { createLogger, transports, format } = require("winston");
require("winston-daily-rotate-file");

/**
 * @description createLogger method of winston is used to generate log messages
 * transports defines storage path
 * it can be configured at various levels
 */
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: "user-service" },
  transports: new transports.DailyRotateFile({
    filename: "logs/log-%DATE%.log",
    datePattern: "DD-MM-YYYY",
  }),
});

module.exports = logger;
