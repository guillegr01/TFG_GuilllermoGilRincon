import express from "express";
import { getDashboardController } from "../controllers/dashboardControllers";

/**
 * * This file is used to route the different endpoints associated with the Dashboard entity.
 * * A route is associated with its respective controller.
 */

export const router = express.Router();

router.get("/user/:userId", getDashboardController);