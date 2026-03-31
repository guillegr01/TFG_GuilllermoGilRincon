
import { ObjectId } from "mongodb";
import { therapyInput, TherapyInputUpdate } from "../types/documents/therapyDocuments";
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

    if(!t_i.userId || t_i.ratios===undefined || t_i.glucoseTarget===undefined || t_i.insulinActive===undefined || t_i.glucoseLimits===undefined) {
        throw new Error("Some required field for therapy wasn´t inserted correctly.");
    }

    //userId field validation
    if(!ObjectId.isValid(t_i.userId)) throw new Error("The field user id associated with therapy is invalid.");

    const userAssociatedExists = await UserCollection.findOne({ _id: new ObjectId(t_i.userId)});
    if(!userAssociatedExists) throw new Error("The inserted userID does not exists in DDBB.");

    const existingTherapy = await TherapyCollection.findOne({ userId: t_i.userId});
    if(existingTherapy) throw new Error("User already has a therapy associated");

    //glucoseTarget field validation
    if(typeof t_i.glucoseTarget !== "number") throw new Error("Glucose Target field must be a number.");
    if(t_i.glucoseTarget <= t_i.glucoseLimits.lowLimit) throw new Error(`Glucose Target cannot be lower than ${t_i.glucoseLimits.lowLimit} and higher than ${t_i.glucoseLimits.inRangeLimit}`);

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

        //sensibilityFactor field validation
        if(typeof rt.sensibilityFactor !== "number") throw new Error("sensibility factor field must be a number.");
        if(rt.sensibilityFactor <= 0) throw new Error("sensibility factor cannot be introduced (must be greater than 0).");

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
        glucoseTarget: t_i.glucoseTarget,
        insulinActive: t_i.insulinActive,
        glucoseLimits: t_i.glucoseLimits
    }

    const { insertedId } = await TherapyCollection.insertOne(therapyToDDBB);

    const finalTherapy = fromModelToTherapy({_id: insertedId, ...therapyToDDBB});

    return finalTherapy;
}


/**
 * * getTherapyByUserService
 * ? METHOD: GET
 * @param userId 
 * @returns Promise<Therapy>
 */
export const getTherapyByUserService = async(userId: string): Promise<Therapy> => {

    if(!ObjectId.isValid(userId)) throw new Error (`Therapy user id ${userId} is invalid.`);

    const TherapyExists = await TherapyCollection.findOne({userId: userId});
    if(!TherapyExists) throw new Error(`Therapy with userId: ${userId} not found.`);

    const Therapy = fromModelToTherapy(TherapyExists);

    return Therapy;
}


/**
 * * putTherapyByIdService
 * ? METHOD: PUT
 * @param TherapyId 
 * @param tiu 
 * @returns Promise<Therapy>
 */
export const putTherapyByIdService = async (TherapyId: string, tiu: TherapyInputUpdate): Promise<Therapy> => {

    if(!ObjectId.isValid(TherapyId)) throw new Error("Therapy id is invalid.");

    if(tiu.ratios===undefined && tiu.glucoseTarget===undefined && tiu.insulinActive===undefined && tiu.glucoseLimits===undefined) {
        throw new Error("One or many required fields were not provided for update.");
    }

    const therapyToModify = await TherapyCollection.findOne({_id: new ObjectId(TherapyId)});
    if(!therapyToModify) throw new Error("Therapy not found.");

    //insulinActive field validation
    if(tiu.insulinActive!==undefined) {
        if(typeof tiu.insulinActive !== "number") throw new Error("Insulin Active field must be a number.");
        if(tiu.insulinActive <= 0) throw new Error("Insulin Active cannot be introduced (must be greater than 0).");
    }

    //ratios field validation
    if(tiu.ratios!==undefined) {
        if(!Array.isArray(tiu.ratios) || tiu.ratios.length === 0) throw new Error("Ratios field must be a non-empty array.");
        tiu.ratios.forEach((rt: InsulinRatio) => {

            //period ratio validation
            if(!validPeriods.includes(rt.period)) throw new Error("Invalid period for ratios.");

            //ratio field validation
            if(typeof rt.ratio !== "number") throw new Error("ratio field must be a number.");
            if(rt.ratio <= 0) throw new Error("Ratio cannot be introduced (must be greater than 0).");

            //sensibilityFactor field validation
            if(typeof rt.sensibilityFactor !== "number") throw new Error("sensibility factor field must be a number.");
            if(rt.sensibilityFactor <= 0) throw new Error("sensibility factor cannot be introduced (must be greater than 0).");

        });
    }

    const glucoseTarget = tiu.glucoseTarget ?? therapyToModify.glucoseTarget;
    const glucoseLimits = tiu.glucoseLimits ?? therapyToModify.glucoseLimits;

    //glucoseTarget field validation
    if(tiu.glucoseTarget!==undefined) {
        if(typeof tiu.glucoseTarget !== "number") throw new Error("Glucose Target field must be a number.");
        if(tiu.glucoseTarget <= glucoseLimits.lowLimit || tiu.glucoseTarget >= glucoseLimits.inRangeLimit) {
            throw new Error(`Glucose Target cannot be lower than ${glucoseLimits.lowLimit} and higher than ${glucoseLimits.inRangeLimit}`);
        }
    }

    //glucose limits validation
    if(tiu.glucoseLimits!==undefined) {

        if( typeof tiu.glucoseLimits.lowLimit !== "number" ||
            typeof tiu.glucoseLimits.inRangeLimit !== "number" ||
            typeof tiu.glucoseLimits.highLimit !== "number" ||
            typeof tiu.glucoseLimits.veryHighLimit !== "number"
        ) {
            throw new Error ("Glucose Limits must be a number");
        } 

        if( tiu.glucoseLimits.lowLimit <= 0 ||
            tiu.glucoseLimits.inRangeLimit <= 0 ||
            tiu.glucoseLimits.highLimit <= 0 ||
            tiu.glucoseLimits.veryHighLimit <= 0
        ) {
            throw new Error("Glucose Limits cannot be introduced (must be greater than 0).");
        }

        if( tiu.glucoseLimits.lowLimit >= tiu.glucoseLimits.inRangeLimit ||
            tiu.glucoseLimits.inRangeLimit >= tiu.glucoseLimits.highLimit ||
            tiu.glucoseLimits.highLimit >= tiu.glucoseLimits.veryHighLimit
        ) {
            throw new Error("Invalid glucoseLimits configuration");
        }

        if(tiu.glucoseLimits.lowLimit >= glucoseTarget || tiu.glucoseLimits.inRangeLimit <= glucoseTarget) {
            throw new Error(`Glucose low limit cannot be higher than ${glucoseTarget} and in range limit cannot be lower than ${glucoseTarget}.`);
        }

    }

    const TherapyModificationResult = await TherapyCollection.findOneAndUpdate(
        {_id: new ObjectId(TherapyId)},
        {$set: tiu}, {returnDocument: "after"});

    if(!TherapyModificationResult) throw new Error("Modified Therapy not found.");

    const modifiedTherapy = fromModelToTherapy(TherapyModificationResult);

    return modifiedTherapy;
}