import { ObjectId } from "mongodb";
import { CarbohydrateIntake } from "../types/types";
import { CarbohydrateIntakeModel } from '../types/ddbbModel';
import { CarbohydrateIntakeCollection, UserCollection } from "../database/collections";
import { fromModelToCarbohydrateIntake } from "../utils/converters";



/**
 * * Services function shall contains all the logic to treat the data 
 * * received from the DDBB or the interface. Then it sends that treated 
 * * data to its respective controller function.
 */


/**
 * * CarbohydrateIntakeInput
 * Info: totalBolus attribute shall be calculated by the backend, 
 * cannot be introduced by the user.
 */
type CarbohydrateIntakeInput = {
    userId: string,
    grams: number,
    glucoseValue: number,
    period: "desayuno" | "comida" | "merienda" | "cena",
    description?: string,
    foodImages?: string[]
}



/**
 * TODO: obtain therapy associated with the user and calculate totalBolus.
 * TODO: check if the values entered for period attribute are valid
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