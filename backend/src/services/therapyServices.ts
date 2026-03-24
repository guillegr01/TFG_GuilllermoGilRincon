
import { ObjectId } from "mongodb";
import { therapyInput } from "../types/documents/therapyDocuments";
import { TherapyCollection, UserCollection } from "../database/collections";
import { Therapy, InsulinRatio } from "../types/types";
import { validPeriods } from "../types/documents/carbohydrateIntakeDocument";
import { TherapyModel } from "../types/ddbbModel";
import { fromModelToTherapy } from "../utils/converters";

/**
 * * Services function shall contains all the logic to treat the data 
 * * received from the DDBB or the interface. Then it sends that treated 
 * * data to its respective controller function.
 */


/**
 * * postTherapyService
 * ? METHOD: POST
 * @param t_i 
 * @returns Promise<Therapy>
 */
export const postTherapyService = async (t_i: therapyInput): Promise<Therapy> => {

    if(!t_i.userId || t_i.ratios === undefined || t_i.insulinActive === undefined || t_i.glucoseLimits === undefined) {
        throw new Error("Some required field for therapy wasn´t inserted correctly.");
    }

    //userId field validation
    if(!ObjectId.isValid(t_i.userId)) throw new Error("The field user id associated with therapy is invalid.");

    const userAssociatedExists = await UserCollection.findOne({ _id: new ObjectId(t_i.userId)});
    if(!userAssociatedExists) throw new Error("The inserted userID does not exists in DDBB.");

    const existingTherapy = await TherapyCollection.findOne({ userId: t_i.userId});
    if(existingTherapy) throw new Error("User already has a therapy associated");

    //insulinActive field validation
    if(typeof t_i.insulinActive !== "number") throw new Error("Insulin Active field must be a number.");
    if(t_i.insulinActive <= 0) throw new Error("Insulin Active cannot be introduced (must be greater than 0).");

    //ratios field validation
    if(!Array.isArray(t_i.ratios) || t_i.ratios.length === 0) throw new Error("Ratios field must be a non-empty array.");
    t_i.ratios.forEach((rt: InsulinRatio) => {

        //period ratio validation
        if(!validPeriods.includes(rt.period)) throw new Error("Invalid period for ratios.");

        //ratio field validation
        if(typeof rt.ratio !== "number") throw new Error("ratio field must be a number.");
        if(rt.ratio <= 0) throw new Error("Ratio cannot be introduced (must be greater than 0).");

        //ratiocorrection field validation
        if(typeof rt.ratioCorrection !== "number") throw new Error("ratio correction field must be a number.");
        if(rt.ratioCorrection <= 0) throw new Error("Ratio correction cannot be introduced (must be greater than 0).");

    });

    //glucose limits validation
    if( typeof t_i.glucoseLimits.lowLimit !== "number" ||
        typeof t_i.glucoseLimits.inRangeLimit !== "number" ||
        typeof t_i.glucoseLimits.highLimit !== "number" ||
        typeof t_i.glucoseLimits.veryHighLimit !== "number"
    ) {
        throw new Error ("Glucose Limits must be a number");
    } 

    if(t_i.glucoseLimits.lowLimit <= 0 ||
        t_i.glucoseLimits.inRangeLimit <= 0 ||
        t_i.glucoseLimits.highLimit <= 0 ||
        t_i.glucoseLimits.veryHighLimit <= 0
    ) {
        throw new Error("Glucose Limits cannot be introduced (must be greater than 0).");
    }

    if(t_i.glucoseLimits.lowLimit >= t_i.glucoseLimits.inRangeLimit ||
        t_i.glucoseLimits.inRangeLimit >= t_i.glucoseLimits.highLimit ||
        t_i.glucoseLimits.highLimit >= t_i.glucoseLimits.veryHighLimit
    ) {
        throw new Error("Invalid glucoseLimits configuration");
    }

    const therapyToDDBB: TherapyModel = {
        userId: t_i.userId,
        ratios: t_i.ratios,
        insulinActive: t_i.insulinActive,
        glucoseLimits: t_i.glucoseLimits
    }

    const { insertedId } = await TherapyCollection.insertOne(therapyToDDBB);

    const finalTherapy = fromModelToTherapy({_id: insertedId, ...therapyToDDBB});

    return finalTherapy;
}