import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import MySQLStore from "express-mysql-session";
// import routes
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

// define application
const app = express();
const port = process.env.APP_PORT;
const TWO_HOURS = 1000 * 60 * 2;
// apply middleware
const options = {
  host: "localhost",
  user: "root",
  database: "testdb",
};

const sessionStore = new MySQLStore(options);
app.use(
  session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: TWO_HOURS, sameSite: true, secure: "auto" },
  })
);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// db.execute("SELECT * FROM `user`", (err, results, fields) => {
//   console.log(results);
// });
app.listen(port, function () {
  console.log("I am alive on port http://localhost:" + port);
});
