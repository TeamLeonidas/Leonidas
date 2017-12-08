const keys = require('../../config/keys.js')
const { Pool } = require('pg');

const pool = new Pool({
  user: keys.POSTGRES_USERNAME,
  host: keys.POSTGRES_URL,
  database: keys.POSTGRES_DBNAME,
  password: keys.POSTGRES_PASSWORD,
  port: keys.POSTGRES_PORT,
});

module.exports = pool;