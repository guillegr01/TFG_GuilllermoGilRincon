import express from "express"
import { postUserController } from "../controllers/userController";

/**
 * * This file is used to route the different endpoints associated with the User entity.
 * * A route is associated with its respective controller.
 */

export const router = express.Router();

router.post("/", postUserController);