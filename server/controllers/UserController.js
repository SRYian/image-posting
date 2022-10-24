import argon2, { hash } from "argon2";
import * as user from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const result = await user.getallUser();
    if (!result.length) {
      return res.status(500).json({ msg: "users does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const result = await user.getusernamebyId(req.params.id);
    if (!result.length) {
      return res.status(500).json({ msg: "user with that id does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password, confpassword } = req.body;
  if (password != confpassword) {
    console.log("password mismatch!");
    return res.status(400).json({ msg: "Password mismatch" });
  }
  const hashPassword = await argon2.hash(password);

  try {
    await user.createUser(username, email, hashPassword);
    res.status(201).json({ msg: "Registration successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const result = await user.getUserPassbyId(req.params.id);

  if (!result.length) {
    return res.status(404).json({ msg: "User not found" });
  }
  const { username, email, password, confpassword } = req.body;

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = rows[0].password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password != confpassword) {
    return res.status(400).json({ msg: "Password mismatch" });
  }
  try {
    await user.updateUser(username, email, hashPassword, req.params.id);
    res.status(201).json({ msg: "Update successfull" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const result = await user.getUserPassbyId(req.params.id);

  if (!result.length) {
    return res.status(404).json({ msg: "User not found" });
  }
  try {
    await user.deleteUserbyId(req.params.id);
    res.status(201).json({ msg: "User deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
