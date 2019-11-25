const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: "error"})
  ]
});

function log(data, level) {
  const date = new Date();
  const logData = {
    timestamp: date.toLocaleString(),
    ...data,
  }

  return logger[level](logData);
}

const loggerWrapper = {
  error: (data) => {
    log(data, "error");
  }
};

module.exports = loggerWrapper;