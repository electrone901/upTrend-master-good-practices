'use strict';
const { API_CONFIG } = require('config');
const { name, username, password, options } = API_CONFIG.dbConfig;

const db = {
  database: name, username, password, ...options
};

module.exports = {
  development: {
    ...db
  },
  test: {
    ...db
  },
  production: {
    ...db
  }
};
