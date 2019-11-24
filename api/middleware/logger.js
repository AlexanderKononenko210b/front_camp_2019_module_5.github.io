const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/info.log', level: "info" }),
    new winston.transports.File({ filename: 'logs/error.log', level: "error"})
  ]
});

function handleLog(data, level) {
  const date = new Date();
  const logData = {
    timestamp: date.toLocaleString(),
    ...data,
  }

  return logger[level](logData);
}

const errorHandler = {
  info: (data) => {
    handleLog(data, 'info');
  },
  error: (data) => {
    handleLog(data, 'error');
  }
};

module.exports = errorHandler;