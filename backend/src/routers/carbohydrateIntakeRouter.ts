import express from "express"
import { postCarbohydrateIntakeController } from '../controllers/carbohydrateIntakeControllers';
import { getCarbohydrateIntakeByIdController, getCarbohydrateIntakeByUserIdController } from '../controllers/carbohydrateIntakeControllers';
import { putCarbohydrateIntakeByIdController } from '../controllers/carbohydrateIntakeControllers';
import { deleteCarbohydrateIntakeByIdController } from '../controllers/carbohydrateIntakeControllers';

/**
 * * This file is used to route the different endpoints associated with the Glucose Register entity.
 * * A route is associated with its respective controller.
 */

export const router = express.Router();

router.post("/", postCarbohydrateIntakeController);
router.get("/:id", getCarbohydrateIntakeByIdController);
router.get("/user/:userId", getCarbohydrateIntakeByUserIdController);
router.put("/:id", putCarbohydrateIntakeByIdController);
router.delete("/:id", deleteCarbohydrateIntakeByIdController);