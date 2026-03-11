import express from "express"
import { postCarbohydrateIntakeController } from '../controllers/carbohydrateIntakeControllers';

/**
 * * This file is used to route the different endpoints associated with the Glucose Register entity.
 * * A route is associated with its respective controller.
 */

export const router = express.Router();

router.post("/", postCarbohydrateIntakeController);