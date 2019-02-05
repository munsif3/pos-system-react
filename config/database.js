const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 10,
  host: process.env.MYSQL_HOST || "0.0.0.0",
  user: process.env.MYSQL_USER || "root",
  database: process.env.DB_NAME || "pos-system", // "pos-system-test"
  password: process.env.DB_PASSWORD || "munsif123"
});

module.exports.query = (sql, args) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        return reject(err);
      }
      conn.query(sql, args, (err, rows) => {
        if (err) {
          return reject(err);
        }
        pool.releaseConnection(conn);
        resolve(rows);
      });
    });
  });
};
