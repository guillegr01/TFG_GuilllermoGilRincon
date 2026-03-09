import express from "express"
import { postGlucoseRegisterController, getGlucoseRegisterByIdController, getGlucoseRegistersByUserIdController } from "../controllers/glucoseRegisterControllers";

/**
 * * This file is used to route the different endpoints associated with the Glucose Register entity.
 * * A route is associated with its respective controller.
 */

export const router = express.Router();


router.post("/", postGlucoseRegisterController);
router.get("/:id", getGlucoseRegisterByIdController);
router.get("/user/:userId", getGlucoseRegistersByUserIdController);