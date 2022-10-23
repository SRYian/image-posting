// import { Sequelize } from "sequelize";
// const db = new Sequelize("testdb", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });
// const mysql = require("mysql2");

// create the connection to database
import mysql from "mysql2/promise";
const options = {
  host: "localhost",
  user: "root",
  database: "testdb",
};
const db = await mysql.createPool(options);

export default db;
