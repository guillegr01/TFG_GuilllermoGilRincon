import { ObjectId } from "mongodb";
import { Dashboard } from "../types/types";
import { CarbohydrateIntakeCollection, GlucoseRegisterCollection, TherapyCollection, UserCollection } from "../database/collections";
import { fromModelToUser, fromModelToTherapy, fromModelToGlucoseRegister, fromModelToCarbohydrateIntake } from "../utils/converters";
import { CarbohydrateIntakeModel, GlucoseRegisterModel } from "../types/ddbbModel";


/**
 * * Services function shall contains all the logic to treat the data 
 * * received from the DDBB or the interface. Then it sends that treated 
 * * data to its respective controller function.
 */



/**
 * * getDashboardService
 * ? METHOD: GET
 * @param userId 
 * @returns Promise<Dashboard>
 */
export const getDashboardService = async (userId: string): Promise<Dashboard> => {

    if(!ObjectId.isValid(userId)) throw new Error("Invalid user ID.");

    //saving user
    const userDDBB = await UserCollection.findOne({_id: new ObjectId(userId)})
    if (!userDDBB) throw new Error("User not found");
    const user = fromModelToUser(userDDBB);

    // saving therapy
    const therapyDDBB = await TherapyCollection.findOne({ userId });
    if(!therapyDDBB) throw new Error("User Therapy not found.");
    const therapy = fromModelToTherapy(therapyDDBB)

    // saving glucose registers
    const glucoseRegistersDDBB = await GlucoseRegisterCollection.find({ userId: userId }).sort({ date_hour: -1 }).limit(30).toArray();
    const glucoseRegisters = glucoseRegistersDDBB.map((grm: GlucoseRegisterModel) => {
        return fromModelToGlucoseRegister(grm);
    });

    // saving meals
    const mealsDDBB = await CarbohydrateIntakeCollection.find({ userId: userId }).sort({ date_hour: -1 }).limit(30).toArray();
    const meals = mealsDDBB.map((chim: CarbohydrateIntakeModel) => {
        return fromModelToCarbohydrateIntake(chim);
    });

    const dashboard = {
        user: user,
        therapy: therapy,
        glucoseRegisters: glucoseRegisters,
        meals: meals
    };

    return dashboard;
};