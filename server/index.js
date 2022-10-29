import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import Fileupload from "express-fileupload";
import MySQLStore from "express-mysql-session";
// import routes
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import PostRoute from "./routes/PostRoute.js";

dotenv.config();

// define application
const app = express();
const port = process.env.PORT;
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
    resave: false,
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: TWO_HOURS, sameSite: "none", secure: "auto" },
  })
);

// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
// app.use(express.json({ limit: "50mb" }));

// app.use(express.urlencoded({ limit: "50mb" }));
app.use(Fileupload());

app.use(express.static("public"));
// regular user routes
app.use(UserRoute);
app.use(PostRoute);
app.use(AuthRoute);

// app.use(express.static(__dirname + "/public"));

// import * as user from "./models/UserModel.js";
// example of using this mysql2
// async function foo() {
//   const [rows, fields] = await db.execute("SELECT * FROM `user`", []);
//   return rows;
// }
// let users = await (async function () {
//   const [rows, fields] = await db.execute("SELECT username FROM `user`", []);
//   return rows;
// })();

// example fucntionality in case future me forgot
// let bar = await user.getUserbyId(1);
// let users = await user.getallUser();
// console.log(bar);
// console.log(users);
// console.log(bar[0].username);
// console.log(users);

app.listen(port, function () {
  console.log("I am alive on port http://localhost:" + port);
});
