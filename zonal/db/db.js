import mysql from 'mysql2/promise';
import env from "dotenv"
env.config()

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306 // Default to 3306 if DB_PORT is not defined
  });
  
  db.getConnection((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Database connected successfully.');
    }
  });
  
export default db;
  
