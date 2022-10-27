import * as post from "../models/PostModel.js";
import path from "path";
import fs from "fs";
import Fileupload from "express-fileupload";

export const getPost = async (req, res) => {
  try {
    const result = await post.getallPost();
    if (!result.length) {
      return res.status(500).json({ msg: "post does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getPostbyId = async (req, res) => {
  try {
    const result = await post.getpostbyId(req.params.id);
    if (!result.length) {
      return res.status(500).json({ msg: "posts does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const savePost = async (req, res) => {
  // console.log(

  // );
  if (req.files === null || req.files === undefined) {
    await post
      .createPost(1, req.body.title, req.body.description)
      .catch(console.error("what are you doing?"));
    return res.status(200).json({ msg: "Post Created without Image" });
  }
  const name = req.body.title;
  const file = req.files.file;
  const filesize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "Invalid Image" });
  }

  if (filesize > 5000000) {
    return res.status(422).json({ msg: "Image must be less thatn 5 MB" });
  }
  file.mv(`./public/images/${fileName}`, async (error) => {
    if (error) {
      return res.status(500).json({ msg: error.message });
    }
    // 1 is a placeholder for testing purposes, please change to this param below
    // req.session.userID
    try {
      console.log(
        req.body.title + " " + req.body.description + " " + req.files.file
      );
      await post.createPost(
        1,
        req.body.title,
        req.body.description,
        fileName,
        url
      );
      res.status(200).json({ msg: "Post Created Successfully!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: error.message });
    }
  });
};

export const updatePost = async (req, res) => {
  const result = await post.getpostbyId(req.params.id);
  if (!result.length) {
    return res.status(500).json({ msg: "No Post Found" });
  }

  // console.log(result[0]);
  let fileName = "";
  if (req.files === null) {
    // no file here

    if (!result[0].image) {
      // no file on db either, just regular post
      await post.updatePost(
        req.params.id,
        req.body.title,
        req.body.description
      );
      res.status(200).json({ msg: "Post Updated Successfully" });
    }

    // there is file on db
    // watch out for this
    //
    fileName = result[0].image;
  } else {
    // file incoming

    // move this maybe
    // same as above

    const file = req.files.file;
    const filesize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Image" });
    }
    if (filesize > 5000000) {
      return res.status(422).json({ msg: "Image must be less thatn 5 MB" });
    }
    // delete old image

    // there is file on db
    if (result[0].image) {
      const filepath = `./public/images/${result[0].image}`;
      console.log("unlink " + filepath);

      fs.unlinkSync(filepath);
      res.status(200).json({ msg: "Post Updated Successfully" });
    }

    // create new file
    file.mv(`./public/images/${fileName}`, async (error) => {
      if (error) {
        return res.status(500).json({ msg: error.message });
      }
    });
  }
  const title = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  console.log("filename" + fileName);
  try {
    await post.updatePost(
      req.params.id,
      title,
      req.body.description,
      fileName,
      url
    );
    res.status(200).json({ msg: "Product Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deletePost = async (req, res) => {
  const result = await post.getpostbyId(req.params.id);
  if (!result.length) {
    return res.status(500).json({ msg: "No Post Found" });
  }
  // if the post is just regular text
  if (!result[0].image || !result[0].url) {
    await post.deletePostbyId(req.params.id);
    return res.status(200).json({ msg: "Post Deleted Successfully" });
  }
  try {
    const filepath = `./public/images/${result[0].image}`;
    fs.unlinkSync(filepath);
    await post.deletePostbyId(req.params.id);
    res.status(200).json({ msg: "Post Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};
