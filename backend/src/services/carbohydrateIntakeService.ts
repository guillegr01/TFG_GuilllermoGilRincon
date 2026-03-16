import { ObjectId } from "mongodb";
import { CarbohydrateIntake } from "../types/types";
import { CarbohydrateIntakeModel } from '../types/ddbbModel';
import { CarbohydrateIntakeCollection, UserCollection } from "../database/collections";
import { fromModelToCarbohydrateIntake } from "../utils/converters";
import { CarbohydrateIntakeInput, CarbohydrateIntakeUpdateInput, validPeriods } from "../types/documents/carbohydrateIntakeDocument";



/**
 * * Services function shall contains all the logic to treat the data 
 * * received from the DDBB or the interface. Then it sends that treated 
 * * data to its respective controller function.
 */


/**
 * TODO: obtain therapy associated with the user and calculate totalBolus.
 * * postCarbohydrateIntakeService
 * ? METHOD: POST
 * @param chi_i 
 * Promise<CarbohydrateIntake>
 */
export const postCarbohydrateIntakeService = async (chi_i: CarbohydrateIntakeInput): Promise<CarbohydrateIntake> => {

    if(!chi_i.userId || chi_i.grams === undefined || !chi_i.glucoseValue === undefined || !chi_i.period) {
        throw new Error("Some required field for carbohydrate intake wasn´t inserted correctly.");
    }

    if(!ObjectId.isValid(chi_i.userId)) throw new Error("The field user id associated with carbohydrate intake is invalid.");

    if(!validPeriods.includes(chi_i.period)) throw new Error("Inserted period is invalid.");

    const userAssociatedExists = await UserCollection.findOne({_id: new ObjectId(chi_i.userId)});
    if(!userAssociatedExists) throw new Error("The inserted userID does not exists in DDBB.");

    //poner limite en gramos segun maximo de hidratos en un dia (therapy entity)
    if(chi_i.grams<0) throw new Error("Carbohydrates grams cannot be introduced (value out of range).");

    if(chi_i.glucoseValue <= 40 || chi_i.glucoseValue >= 400) throw new Error("Glucose Value cannot be introduced (value out of range).");

    // obtener therapy

    //calcular totalBolus

    const carbohydrateIntakeToDDBB: CarbohydrateIntakeModel = {
        userId: chi_i.userId,
        grams: chi_i.grams,
        glucoseValue: chi_i.glucoseValue,
        period: chi_i.period,
        date_hour: new Date(), 
        description: chi_i.description,
        foodImages: chi_i.foodImages
        //totalBolus
    }

    const { insertedId } = await CarbohydrateIntakeCollection.insertOne(carbohydrateIntakeToDDBB);

    const finalCarbohydrateIntake = fromModelToCarbohydrateIntake({_id: insertedId, ...carbohydrateIntakeToDDBB});

    return finalCarbohydrateIntake;
}


/**
 * * getCarbohydrateIntakeByIdService
 * ? METHOD: GET
 * @param carbohydrateIntakeId 
 * @returns Promise<CarbohydrateIntake>
 */
export const getCarbohydrateIntakeByIdService = async (carbohydrateIntakeId: string): Promise<CarbohydrateIntake> => {

    if(!ObjectId.isValid(carbohydrateIntakeId)) throw new Error(`Carbohydrate Intake id ${carbohydrateIntakeId} is invalid.`);

    const carboHydrateIntakeDDBB = await CarbohydrateIntakeCollection.findOne({_id: new ObjectId(carbohydrateIntakeId)});
    if(!carboHydrateIntakeDDBB) throw new Error("Carbohydrate Intake not found.");

    const carboHydrateIntakeFound = fromModelToCarbohydrateIntake(carboHydrateIntakeDDBB);

    return carboHydrateIntakeFound;

}


/**
 * * getCarbohydrateIntakeByUserIdService
 * ? METHOD: GET
 * @param userId 
 * @returns Promise<CarbohydrateIntake[]>
 */
export const getCarbohydrateIntakeByUserIdService = async (userId: string): Promise<CarbohydrateIntake[]> => {

    if(!ObjectId.isValid(userId)) throw new Error (`Carbohydrate intake user id ${userId} is invalid.`);

    const userDDBB = await UserCollection.findOne({_id: new ObjectId(userId)});
    if(!userDDBB) throw new Error("User not found.");

    const carbohydrateIntakesDDBB = await CarbohydrateIntakeCollection.find({userId: userId}).sort({date_hour: -1}).toArray();

    const carboHydrateIntakes = carbohydrateIntakesDDBB.map((cim: CarbohydrateIntakeModel) => {
        return fromModelToCarbohydrateIntake(cim);
    });

    return carboHydrateIntakes;

}


/**
 * * putCarbohydrateIntakeByIdService
 * ? METHOD: PUT
 * @param chi_ui 
 * @returns Promise<CarbohydrateIntake>
 */
export const putCarbohydrateIntakeByIdService = async (carbohydrateIntakeId: string, chi_ui: CarbohydrateIntakeUpdateInput): Promise<CarbohydrateIntake> => {

    if(!ObjectId.isValid(carbohydrateIntakeId)) throw new Error("The field carbohydrate intake id is invalid.");

    if(chi_ui.grams===undefined && chi_ui.glucoseValue===undefined && chi_ui.period===undefined && chi_ui.description===undefined) throw new Error("One or many required fields were not provided for update.");

    if(chi_ui.grams !== undefined) {
        if(typeof chi_ui.grams !== "number") throw new Error("Grams field must be a number.");
        if(chi_ui.grams<0) throw new Error("Carbohydrates grams cannot be introduced (value out of range).");
    }

    if(chi_ui.glucoseValue !== undefined) {
        if(typeof chi_ui.glucoseValue !== "number") throw new Error("Glucose Value field must be a number.");
        if(chi_ui.glucoseValue <= 40 || chi_ui.glucoseValue >= 400) throw new Error("Glucose Value cannot be introduced (value out of range).");
    }

    if(chi_ui.period !== undefined) {
        if(typeof chi_ui.period !== "string") throw new Error("Period field must be a string.")
        if(!validPeriods.includes(chi_ui.period)) throw new Error("Inserted period is invalid.");
    }

    if(chi_ui.description !== undefined) {
        if(typeof chi_ui.description !== "string") throw new Error("Description field must be a string.")
    }

    const carbohydrateIntakeModificationResult = await CarbohydrateIntakeCollection.findOneAndUpdate(
        {_id: new ObjectId(carbohydrateIntakeId)},
        {$set: chi_ui}, { returnDocument: "after"});

    if(!carbohydrateIntakeModificationResult) throw new Error("Modified carbohydrates intake not found.");

    const modifiedCarbohydrateIntake = fromModelToCarbohydrateIntake(carbohydrateIntakeModificationResult);

    return modifiedCarbohydrateIntake;
}