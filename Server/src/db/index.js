"use strict";

const { Pool } = require('pg');
const { DB } = require('../../config');

const pool = new Pool(process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
} : {
  host: DB.PGHOST,
  user: DB.PGUSER,
  database:DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params)
}

