require("dotenv").config();
const mysql = require("mysql2/promise");

console.log("DB_HOST en db.js:", process.env.DB_HOST);
console.log("DB_USER en db.js:", process.env.DB_USER);
console.log("DB_PASSWORD existe?:", Boolean(process.env.DB_PASSWORD));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
