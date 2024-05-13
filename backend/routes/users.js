import express from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";

//Update a User
router.put("/:id",verifyUser, updateUser);

//Delete a User
router.delete("/:id",verifyUser, deleteUser);

//get a single User
router.get("/:id",verifyUser, getSingleUser);

//get all Users
router.get("/",verifyAdmin, getAllUser);

export default router;