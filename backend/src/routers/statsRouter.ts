import express from "express";
import { getStatsByUserIdController } from "../controllers/statsController";

/**
 * * This file is used to route the different endpoints associated with the Stats.
 * * A route is associated with its respective controller.
 */
export const router = express.Router();

router.get("/user/:userId", getStatsByUserIdController);