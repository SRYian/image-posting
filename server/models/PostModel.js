import db from "../config/Database.js";

export async function getallPost() {
  const [rows, fields] = await db.execute(
    "SELECT title, description, image, url FROM `post`"
  );
  return rows;
}

export async function getpostbyId(id) {
  const [rows, fields] = await db.execute(
    "SELECT title, description, image, url FROM `post` WHERE id=?",
    [id]
  );
  return rows;
}

export async function getpostbyTitle(title) {
  const [rows, fields] = await db.execute(
    "SELECT title, description, image, url FROM `user` WHERE title=?",
    [title]
  );
  return rows;
}

export async function createPost(title, description, image, url) {
  const [rows, fields] = await db.execute(
    "INSERT INTO `post`(`title`, `description`, `image`, `url`) VALUES (?,?,?,?)",
    [title, description, image, url]
  );
  return rows;
}

export async function createPost(title, image, url) {
  const [rows, fields] = await db.execute(
    "INSERT INTO `post`(`title`, `image`, `url`) VALUES (?,?,?)",
    [title, image, url]
  );
  return rows;
}

export async function createPost(title, description) {
  const [rows, fields] = await db.execute(
    "INSERT INTO `post`(`title`, `description`) VALUES (?,?)",
    [title, description]
  );
  return rows;
}

export async function updatePost(newusername, newhashedPassword, id) {
  const [rows, fields] = await db.execute(
    "UPDATE `user` SET `username`=?,`password`=? WHERE id = ?",
    [newusername, newhashedPassword, id]
  );
  return rows;
}

export async function deleteUserbyId(id) {
  const [rows, fields] = await db.execute("DELETE FROM `post` WHERE id=?", [
    id,
  ]);
  return rows;
}

export async function deleteUserbyTitle(title) {
  const [rows, fields] = await db.execute("DELETE FROM `post` WHERE title=?", [
    title,
  ]);
  return rows;
}
