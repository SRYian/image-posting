import argon2, { hash, verify } from "argon2";
import * as user from "../models/UserModel.js";

export const Login = async (req, res) => {
  console.log("aku diapnggil");
  const result = await user.getUserPassbyUsername(req.body.username);
  if (!result.length) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (req.session.userName === req.body.username) {
    return res.status(404).json({ msg: "User already logged in!" });
  }
  const match = await argon2
    .verify(result[0].password, req.body.password)
    .catch(console.log);
  if (!match) {
    return res.status(400).json({ msg: "Wrong Password" });
  }
  req.session.userID = result[0].id;
  req.session.userName = result[0].username;
  const id = result[0].id;
  const username = result[0].username;
  return res.status(200).json({ username });
};

export const Me = async (req, res) => {
  if (!req.session.userName) {
    return res.status(400).json({ msg: "Please login" });
  }

  const result = await user.getusernamebyUsername(req.session.userName);
  if (!result.length) {
    return res.status(404).json({ msg: "User not found" });
  }
  return res.status(200).json({ msg: result });
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: "Cannot logout" });
    }
    res.status(400).json({ msg: "Logged out" });
  });
};
