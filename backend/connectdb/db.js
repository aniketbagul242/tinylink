// connectdb/db.js
import dotenv from "dotenv"
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

export default {
  query: (text, params) => pool.query(text, params),
  pool,
};
