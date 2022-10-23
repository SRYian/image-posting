import db from "../config/Database.js";

export const users = await (async function () {
  const [rows, fields] = await db.execute("SELECT username FROM `user`", []);
  return rows;
})();

export async function getallUser() {
  const [rows, fields] = await db.execute("SELECT username FROM `user`");
  return rows;
}

export async function getusernamebyId(id) {
  const [rows, fields] = await db.execute(
    "SELECT username FROM `user` WHERE id=?",
    [id]
  );
  return rows;
}

export async function getusernamebyUsername(username) {
  const [rows, fields] = await db.execute(
    "SELECT username FROM `user` WHERE username=?",
    [username]
  );
  return rows;
}

export async function getUserPassbyId(id) {
  const [rows, fields] = await db.execute(
    "SELECT username, password FROM `user` WHERE id=?",
    [id]
  );
  return rows;
}

export async function getUserPassbyUsername(username) {
  const [rows, fields] = await db.execute(
    "SELECT username, password FROM `user` WHERE username=?",
    [username]
  );
  return rows;
}

export async function createUser(username, email, hashedPassword) {
  const [rows, fields] = await db.execute(
    "INSERT INTO `user`(`username`,`email`, `password`) VALUES (?,?,?)",
    [username, email, hashedPassword]
  );
  return rows;
}

export async function updateUser(newusername, newemail, newhashedPassword, id) {
  const [rows, fields] = await db.execute(
    "UPDATE `user` SET `username`=?, `email`=?,`password`=? WHERE id = ?",
    [newusername, newemail, newhashedPassword, id]
  );
  return rows;
}

export async function deleteUserbyId(id) {
  const [rows, fields] = await db.execute("DELETE FROM `user` WHERE id=?", [
    id,
  ]);
  return rows;
}

export async function deleteUserbyUsername(username) {
  const [rows, fields] = await db.execute(
    "DELETE FROM `user` WHERE username=?",
    [username]
  );
  return rows;
}
