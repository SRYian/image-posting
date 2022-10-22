const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let items = [];
app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindofDay: day, newlistItems: items });
});
app.post("/", (req, res) => {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(port, function () {
  console.log("I am alive on port " + port);
});
