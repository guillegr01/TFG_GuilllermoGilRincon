import express from "express";
import { postTherapyController, getTherapyByUserController } from "../controllers/therapyControllers";

/**
 * * This file is used to route the different endpoints associated with the Therapy entity.
 * * A route is associated with its respective controller.
 */
export const router = express.Router();

router.post("/", postTherapyController);
router.get("/user/:userId", getTherapyByUserController);