import { ObjectId } from "mongodb";
import { GlucoseRegister } from "../types/types";
import { GlucoseRegisterCollection, UserCollection } from "../database/collections";
import { GlucoseRegisterModel } from "../types/ddbbModel";
import { fromModelToGlucoseRegister } from "../utils/converters";


/**
 * * Services function shall contains all the logic to treat the data 
 * * received from the DDBB or the interface. Then it sends that treated 
 * * data to its respective controller function.
 */

type GlucoseRegisterInput = {
    userId: string,
    glucoseValue: number,
    date_hour: Date,
    registerMethod: "manual" | "sensor"
};


/**
 * * postGlucoseRegisterService
 * ? METHOD: POST
 * @param gri 
 * @returns Promise<GlucoseRegister>
 */
export const postGlucoseRegisterService = async (gri: GlucoseRegisterInput): Promise<GlucoseRegister> => {

    if(!gri.userId || gri.glucoseValue === undefined || !gri.date_hour || !gri.registerMethod) {
        throw new Error("Some required field for glucose value wasn´t inserted correctly.");
    }

    if(!ObjectId.isValid(gri.userId)) throw new Error("The field user id associated with glucose value is invalid.");

    const userAssociatedExists = await UserCollection.findOne({_id: new ObjectId(gri.userId)});

    if(!userAssociatedExists) throw new Error("The inserted userID does not exists in DDBB.");

    if(gri.glucoseValue <= 40 || gri.glucoseValue >= 400) throw new Error("Glucose Value cannot be introduced (value out of range).");

    const glucoseRegisterToDDBB: GlucoseRegisterModel = {
        userId: gri.userId,
        glucoseValue: gri.glucoseValue,
        date_hour: gri.date_hour,
        registerMethod: gri.registerMethod
    }

    const { insertedId } = await GlucoseRegisterCollection.insertOne(glucoseRegisterToDDBB);

    const finalGlucoseRegister = fromModelToGlucoseRegister({_id: insertedId, ...glucoseRegisterToDDBB});

    return finalGlucoseRegister;
}



/**
 * * getGlucoseRegisterByIdService
 * ? METHOD: GET
 * @param glucoseRegisterId 
 * @returns Promise<GlucoseRegister>
 */
export const getGlucoseRegisterByIdService = async (glucoseRegisterId: string): Promise<GlucoseRegister> => {

    if(!ObjectId.isValid(glucoseRegisterId)) throw new Error(`Glucose Register id ${glucoseRegisterId} is invalid.`);

    const glucoseRegisterDDBB = await GlucoseRegisterCollection.findOne({_id: new ObjectId(glucoseRegisterId)});
    if(!glucoseRegisterDDBB) throw new Error("Glucose register not found.");

    const glucoseRegisterFound = fromModelToGlucoseRegister(glucoseRegisterDDBB);

    return glucoseRegisterFound;
}