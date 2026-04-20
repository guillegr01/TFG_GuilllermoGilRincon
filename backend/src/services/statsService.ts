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
export const getStatsByUserIdService = async (userId: string, daysFilter: number): Promise<InRangeStats> => {

    if(!ObjectId.isValid(userId as string)) throw new Error(`User id ${userId} is invalid.`);

    //Search therapy associated to user id
    const TherapyDDBB = await TherapyCollection.findOne({userId: userId});
    if(!TherapyDDBB) throw new Error(`Therapy with userId: ${userId} not found.`);
    const Therapy = fromModelToTherapy(TherapyDDBB);

    //Date filter logic
    const dateLimit = new Date();

    if(daysFilter===1) { //24 hours filter (substract exacts 24 hours)
        dateLimit.setHours(dateLimit.getHours() - 24);
    } else { //7 and 30 days filter (begining of the day 00:00)
        dateLimit.setDate(dateLimit.getDate() - daysFilter);
        dateLimit.setHours(0,0,0,0);
    }

    //Search glucoseRegisters associated to user id
    const GlucoseRegistersDDBB = await GlucoseRegisterCollection.find({userId: userId, date_hour: {$gte: dateLimit}}).toArray();
    if(GlucoseRegistersDDBB.length === 0) return { low: 0, inRange: 0, high: 0, veryHigh: 0};

    const GlucoseRegistersArray = GlucoseRegistersDDBB.map((grm: GlucoseRegisterModel) => {
        return fromModelToGlucoseRegister(grm);
    });

    const result: InRangeStats = calculateStats(GlucoseRegistersArray, Therapy);

    return result;
}