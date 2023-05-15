
const winston = require('winston');

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5
};

const consoleLogFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: {  },
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        consoleLogFormat
      )
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.transports[1].level = 'debug'; 
} else {
  logger.transports[1].level = 'info'; 
}

module.exports = logger;