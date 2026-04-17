import { ObjectId } from "mongodb";
import { InRangeStats } from "../types/types";
import { GlucoseRegisterCollection, TherapyCollection } from "../database/collections";
import { fromModelToGlucoseRegister, fromModelToTherapy } from "../utils/converters";
import { GlucoseRegisterModel } from "../types/ddbbModel";
import { calculateStats } from "../utils/statsFunctions";

/**
 * * Services function shall contains all the logic to treat the data 
 * * received from the DDBB or the interface. Then it sends that treated 
 * * data to its respective controller function.
 */


/**
 * getStatsByUserIdService
 * @param userId 
 * @returns Promise<InRangeStats>
 */
export const getStatsByUserIdService = async (userId: string): Promise<InRangeStats> => {

    if(!ObjectId.isValid(userId as string)) throw new Error(`User id ${userId} is invalid.`);

    //Search therapy associated to user id
    const TherapyDDBB = await TherapyCollection.findOne({userId: userId});
    if(!TherapyDDBB) throw new Error(`Therapy with userId: ${userId} not found.`);
    
    const Therapy = fromModelToTherapy(TherapyDDBB);

    //Search glucoseRegisters associated to user id
    const GlucoseRegistersDDBB = await GlucoseRegisterCollection.find({userId: userId}).toArray();
    if(GlucoseRegistersDDBB.length === 0) throw new Error(`No Glucose Registers with userId: ${userId} found.`);

    const GlucoseRegistersArray = GlucoseRegistersDDBB.map((grm: GlucoseRegisterModel) => {
        return fromModelToGlucoseRegister(grm);
    });

    const result: InRangeStats = calculateStats(GlucoseRegistersArray, Therapy);

    return result;
}