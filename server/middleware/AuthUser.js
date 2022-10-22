import db from "../config/Database.js";

export const VerifyUser = async (req, res, next) => {
  if (!req.session.userID) {
    return res.status(400).json({ msg: "Please login" });
  }
  const [rows, fields] = await db
    .promise()
    .execute("SELECT username FROM `user` WHERE `username` = ?", [
      req.session.userID,
    ]);
  if (!rows.length) {
    return res.status(404).json({ msg: "User not found" });
  }
  req.userID = rows[0].username;
  next();
};
