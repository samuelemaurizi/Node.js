const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/mongo-exercises',
      metaKey: 'meta'
    })
  ]
});

function error(err, req, res, next) {
  logger.error(err.message, {
    meta: {
      message: err.message,
      name: err.name,
      stack: err.stack
    }
  });

  res.status(500).send('Somthing went wrong...');
}

module.exports = error;
