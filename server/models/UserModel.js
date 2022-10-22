import db from "../config/Database.js";
() => {
  db.query("SELECT user FROM `user`", function (err, results, fields) {
    console.log(results.username); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  });
};
