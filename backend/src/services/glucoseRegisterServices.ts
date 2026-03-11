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
    registerMethod: "manual" | "sensor"
};

type GlucoseRegisterInputUpdate = {
    glucoseValue?: number;
    date_hour?: Date;
    registerMethod?: "manual" | "sensor";
}


/**
 * * postGlucoseRegisterService
 * ? METHOD: POST
 * @param gri 
 * @returns Promise<GlucoseRegister>
 */
export const postGlucoseRegisterService = async (gri: GlucoseRegisterInput): Promise<GlucoseRegister> => {

    if(!gri.userId || gri.glucoseValue === undefined || !gri.registerMethod) {
        throw new Error("Some required field for glucose value wasn´t inserted correctly.");
    }

    if(!ObjectId.isValid(gri.userId)) throw new Error("The field user id associated with glucose value is invalid.");

    const userAssociatedExists = await UserCollection.findOne({_id: new ObjectId(gri.userId)});

    if(!userAssociatedExists) throw new Error("The inserted userID does not exists in DDBB.");

    if(gri.glucoseValue <= 40 || gri.glucoseValue >= 400) throw new Error("Glucose Value cannot be introduced (value out of range).");

    const glucoseRegisterToDDBB: GlucoseRegisterModel = {
        userId: gri.userId,
        glucoseValue: gri.glucoseValue,
        date_hour: new Date(),
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


/**
 * * getGlucoseRegistersByUserIdService
 * ? METHOD: GET
 * @param userId 
 * @returns Promise<GlucoseRegister[]>
 */
export const getGlucoseRegistersByUserIdService = async (userId: string): Promise<GlucoseRegister[]> => {

    if(!ObjectId.isValid(userId)) throw new Error(`Glucose register user id ${userId} is invalid.`);

    const userDDBB = await UserCollection.findOne({_id: new ObjectId(userId)});
    if(!userDDBB) throw new Error("User not found.");

    //.sort({date_hour: -1}) sorts the glucose registers by descending date (the most recent date first)
    const glucoseRegistersDDBB = await GlucoseRegisterCollection.find({userId: userId}).sort({date_hour: -1}).toArray();

    const glucoseRegisters = glucoseRegistersDDBB.map((grm: GlucoseRegisterModel) => { return fromModelToGlucoseRegister(grm)});

    return glucoseRegisters;
}


/**
 * * putGlucoseregisterByIdService
 * ? METHOD: PUT
 * @param glucoseRegisterId 
 * @param griu 
 * @returns Promise<GlucoseRegister>
 */
export const putGlucoseregisterByIdService = async (glucoseRegisterId: string, griu: GlucoseRegisterInputUpdate): Promise<GlucoseRegister> => {

    if(!ObjectId.isValid(glucoseRegisterId)) throw new Error("The field glucose register id is invalid.");

    if(!griu.glucoseValue && !griu.date_hour && !griu.registerMethod) throw new Error("One or many required fields were not provided for update.");

    const glucoseRegisterModificationResult = await GlucoseRegisterCollection.findOneAndUpdate({_id: new ObjectId(glucoseRegisterId)}, {$set: griu}, {returnDocument: "after"});
    if(!glucoseRegisterModificationResult) throw new Error("Modified glucose register not found.");

    const modifiedGlucoseRegister = fromModelToGlucoseRegister(glucoseRegisterModificationResult);

    return modifiedGlucoseRegister;
}


/**
 * * deleteGlucoseRegisterByIdService
 * ? METHOD: DELETE
 * @param glucoseRegisterId 
 * @returns Promise<boolean>
 */
export const deleteGlucoseRegisterByIdService = async (glucoseRegisterId: string): Promise<boolean> => {

    let deletedGlucoseRegister: boolean;

    if(!glucoseRegisterId) throw new Error("The field id is required.");

    if(!ObjectId.isValid(glucoseRegisterId)) throw new Error("The field glucose register id is invalid.");

    const glucoseRegisterToDeleteDDBB = await GlucoseRegisterCollection.findOne({_id: new ObjectId(glucoseRegisterId)});
    if(!glucoseRegisterToDeleteDDBB) throw new Error("There is no glucose register with the provided id.");

    const { deletedCount } = await GlucoseRegisterCollection.deleteOne({_id: new ObjectId(glucoseRegisterId)});

    if(deletedCount===0) {
        deletedGlucoseRegister = false;
        throw new Error("Glucose register to delete was not found.");
    }else {
        deletedGlucoseRegister = true;
    }

    return deletedGlucoseRegister;
}