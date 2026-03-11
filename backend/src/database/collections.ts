import { CarbohydrateIntakeModel, GlucoseRegisterModel, TherapyModel, UserModel } from "../types/ddbbModel";
import { db } from "./mongoConnection";

/**
 * * In this file, all the collection from the database 
 * * are saved into variables.
 * ? Step 1: save users collection
 * ? Step 2: save glucose registers collection
 * ? Step 3: save carbohydrates intakes collection
 * ? Step 4: save therapy collection
 */

export const UserCollection = db.collection<UserModel>("User");
export const GlucoseRegisterCollection = db.collection<GlucoseRegisterModel>("GlucoseRegister");
export const CarbohydrateIntakeCollection = db.collection<CarbohydrateIntakeModel>("CarbohydrateIntake");
export const TherapyCollection = db.collection<TherapyModel>("Therapy");

/**
 * * Index for endpoint get /glucose-register/user/:userId
 * Info: with this index mongo goes directly to userId field
 * and has all the registers sorted by date_hour. This optimise
 * mongo querys as .find() in  /glucose-register/user/:userId .
 */
GlucoseRegisterCollection.createIndex({userId: 1, date_hour: -1});

CarbohydrateIntakeCollection.createIndex({userId: 1, date_hour: -1});