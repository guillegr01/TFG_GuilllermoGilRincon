import express from "express"
import { postGlucoseRegisterController } from "../controllers/glucoseRegisterControllers";
import { getGlucoseRegisterByIdController, getGlucoseRegistersByUserIdController } from "../controllers/glucoseRegisterControllers";
import { putGlucoseregisterByIdController } from "../controllers/glucoseRegisterControllers";
import { deleteGlucoseregisterByIdController } from "../controllers/glucoseRegisterControllers";

/**
 * * This file is used to route the different endpoints associated with the Glucose Register entity.
 * * A route is associated with its respective controller.
 */

export const router = express.Router();


router.post("/", postGlucoseRegisterController);
router.get("/:id", getGlucoseRegisterByIdController);
router.get("/user/:userId", getGlucoseRegistersByUserIdController);
router.put("/:id", putGlucoseregisterByIdController);
router.delete("/:id", deleteGlucoseregisterByIdController);