import express from "express";
import {
  getPost,
  getPostbyId,
  savePost,
  updatePost,
  deletePost,
} from "../controllers/PostController.js";

const router = express.Router();

router.get("/post", getPost);
router.get("/post/:id", getPostbyId);
router.post("/post", savePost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
