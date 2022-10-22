import express from "express";
import {
  getUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserbyId);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
