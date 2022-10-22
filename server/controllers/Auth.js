import argon2, { hash, verify } from "argon2";
import db from "../config/Database.js";

export const Login = async (req, res) => {
  const [rows, fields] = await db
    .promise()
    .execute("SELECT username, password FROM `user` WHERE `username` = ?", [
      req.body.username,
    ])
    .catch(console.log);

  if (!rows.length) {
    return res.status(404).json({ msg: "User not found" });
  }

  const match = await argon2
    .verify(rows[0].password, req.body.password)
    .catch(console.log);

  if (!match) {
    return res.status(400).json({ msg: "Wrong Password" });
  }
  req.session.userID = rows[0].username;
  const id = rows[0].id;
  const username = rows[0].username;
  return res.status(200).json({ id, username });
};

export const Me = async (req, res) => {
  if (!req.session.userID) {
    return res.status(400).json({ msg: "Please login" });
  }
  console.log(req.session.userID);
  const [rows, fields] = await db
    .promise()
    .execute("SELECT username FROM `user` WHERE `username` = ?", [
      req.session.userID,
    ]);
  if (!rows.length) {
    return res.status(404).json({ msg: "User not found" });
  }
  return res.status(200).json({ msg: rows });
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: "Cannot logout" });
    }
    res.status(400).json({ msg: "Logged out" });
  });
};
