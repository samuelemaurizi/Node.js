const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
  const db = config.get('db');
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(() => console.error(`Could not connect to ${db}...`));
};
