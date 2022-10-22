import db from "../config/Database.js";
import argon2, { hash } from "argon2";

export const getUsers = async (req, res) => {
  await db.execute("SELECT username FROM `user`", (err, result, fields) => {
    console.log(result);
    if (err) {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    } else {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ msg: "users does not exist" });
      }
    }
  });
};

export const getUserbyId = async (req, res) => {
  //   console.log(req.params.id);
  await db.execute(
    "SELECT username FROM `user` WHERE `id` = ?",
    [req.params.id],
    (err, result, fields) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err.msg });
      } else {
        if (!result.length) {
          res.status(500).json({ msg: "user with that id does not exist" });
        } else {
          res.status(200).json(result);
        }
      }
    }
  );
};

export const createUser = async (req, res) => {
  const { username, password, confpassword } = req.body;
  if (password != confpassword) {
    console.log("password mismatch bang");
    return res.status(400).json({ msg: "Password mismatch" });
  }
  const hashPassword = await argon2.hash(password);
  await db.execute(
    "INSERT INTO `user`(`username`, `password`) VALUES (?,?)",
    [username, hashPassword],
    (err, result, fields) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.status(400).json({ msg: err.msg });
      } else {
        res.status(201).json({ msg: "Registration successfull" });
      }
    }
  );
};

export const updateUser = async (req, res) => {
  const [rows, fields] = await db
    .promise()
    .execute("SELECT username, password FROM `user` WHERE `id` = ?", [
      req.params.id,
    ]);
  // let result = JSON.stringify(rows);
  //   console.log("newpass: " + rows);
  if (!rows.length) {
    return res.status(404).json({ msg: "User not found" });
  }
  const { username, password, confpassword } = req.body;

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = rows[0].password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password != confpassword) {
    return res.status(400).json({ msg: "Password mismatch" });
  }
  await db.execute(
    "UPDATE `user` SET `username`=?,`password`=? WHERE id = ?",
    [username, hashPassword, req.params.id],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: err.msg });
      } else {
        console.log(req.params.id + " " + username + " " + hashPassword);
        res.status(201).json({ msg: "Update successfull" });
      }
    }
  );
};

export const deleteUser = async (req, res) => {
  const [rows, fields] = await db
    .promise()
    .execute("SELECT username, password FROM `user` WHERE `id` = ?", [
      req.params.id,
    ]);

  if (!rows.length) {
    return res.status(404).json({ msg: "User not found" });
  }

  await db.execute(
    "DELETE FROM `user` WHERE id=?",
    [req.params.id],
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: err.msg });
      } else {
        res.status(201).json({ msg: "User deleted" });
      }
    }
  );
};
