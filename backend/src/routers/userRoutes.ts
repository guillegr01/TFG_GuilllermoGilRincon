import express from "express"
import { postUserController, getUserByIdController, putUserByIdController, deleteUserByIdController } from "../controllers/userControllers";

/**
 * * This file is used to route the different endpoints associated with the User entity.
 * * A route is associated with its respective controller.
 */

export const router = express.Router();

router.post("/", postUserController);
router.get("/:id", getUserByIdController);
router.put("/:id", putUserByIdController);
router.delete("/:id", deleteUserByIdController);