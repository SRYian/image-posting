import express from "express";
import {
  getUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
const router = express.Router();
import { VerifyUser } from "../middleware/AuthUser.js";

router.get("/users", VerifyUser, getUsers);
router.get("/users/:id", VerifyUser, getUserbyId);
router.post("/users", VerifyUser, createUser);
router.patch("/users/:id", VerifyUser, updateUser);
router.delete("/users/:id", VerifyUser, deleteUser);

export default router;
