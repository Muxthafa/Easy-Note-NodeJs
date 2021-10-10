const {createLogger,transports,format, transport } = require('winston')

const logger = createLogger({
    format: format.combine(format.timestamp(),format.json()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new transports.File({
            filename: 'logs/info.log',
            level: 'info'
        })
    ],
  });

  module.exports = logger;