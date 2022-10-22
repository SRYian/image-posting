import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";

// import routes
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

// define application
const app = express();
const port = process.env.APP_PORT;

// apply middleware
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(UserRoute);
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

try {
  await db.authorized;
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// db.execute("SELECT * FROM `user`", (err, results, fields) => {
//   console.log(results);
// });
app.listen(port, function () {
  console.log("I am alive on port http://localhost:" + port);
});
