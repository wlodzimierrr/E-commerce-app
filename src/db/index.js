"use strict";

const { Pool } = require('pg');
const { DB } = require('../../config');

const pool = new Pool(process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
} : {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});


module.exports = {
  query: (text, params) => pool.query(text, params)
}

