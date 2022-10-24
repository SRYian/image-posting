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

export async function createPost(userid, title, description, image, url) {
  if (!description) {
    const [rows, fields] = await db.execute(
      "INSERT INTO `post`(`title`, `image`, `url`, `user_id`) VALUES (?,?,?,?)",
      [title, image, url, userid]
    );
    return rows;
  }
  if (!image || !url) {
    const [rows, fields] = await db.execute(
      "INSERT INTO `post`(`title`, `description`, `user_id`) VALUES (?,?,?)",
      [title, description, userid]
    );
    return rows;
  }
  const [rows, fields] = await db.execute(
    "INSERT INTO `post`(`title`, `description`, `image`, `url`, `user_id`) VALUES (?,?,?,?,?)",
    [title, description, image, url, userid]
  );
  return rows;
}

// export async function createPost(userid, title, image, url) {
//   const [rows, fields] = await db.execute(
//     "INSERT INTO `post`(`title`, `image`, `url`, `user_id`) VALUES (?,?,?,?)",
//     [title, image, url, userid]
//   );
//   return rows;
// }

// export async function createPost(userid, title, description) {
//   const [rows, fields] = await db.execute(
//     "INSERT INTO `post`(`title`, `description`, `user_id`) VALUES (?,?,?)",
//     [title, description, userid]
//   );
//   return rows;
// }

export async function updatePost(id, title, description, image, url) {
  if (!image || !url) {
    const [rows, fields] = await db.execute(
      "UPDATE `post` SET `title`=?,`description`=? WHERE id = ?",
      [title, description, id]
    );
    return rows;
  }
  if (!title || !description) {
    const [rows, fields] = await db.execute(
      "UPDATE `post` SET `image`=?,`url`=? WHERE id = ?",
      [image, url, id]
    );
    return rows;
  }
  const [rows, fields] = await db.execute(
    "UPDATE `post` SET `title`=?,`description`=?,`image`=?,`url`=? WHERE id = ?",
    [title, description, image, url, id]
  );
  return rows;
}

// export async function updatePost(id, title, description) {
//   const [rows, fields] = await db.execute(
//     "UPDATE `post` SET `title`=?,`description`=? WHERE id = ?",
//     [title, description, id]
//   );
//   return rows;
// }

// export async function updatePost(id, image, url) {
//   const [rows, fields] = await db.execute(
//     "UPDATE `post` SET `image`=?,`url`=? WHERE id = ?",
//     [image, url, id]
//   );
//   return rows;
// }

export async function deletePostbyId(id) {
  const [rows, fields] = await db.execute("DELETE FROM `post` WHERE id=?", [
    id,
  ]);
  return rows;
}

export async function deletePostbyTitle(title) {
  const [rows, fields] = await db.execute("DELETE FROM `post` WHERE title=?", [
    title,
  ]);
  return rows;
}
