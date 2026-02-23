import { UserCollection } from "../database/collections";
import { UserModel } from "../types/ddbbModel";
import { User } from "../types/types";
import { fromModelToUser } from "../utils/converters";


/**
 * * Services function shall contains all the logic to treat the data 
 * * received from the DDBB or the interface. Then it sends that treated 
 * * data to its respective controller function.
 */


type UserInput = {
    name: string;
    surname: string;
    email: string;
    password: string;
    birthDate: Date;
    diabetesType: "tipo 1" | "tipo 2";
};

/**
 * * postUserService
 * ? METHOD: POST
 * @param ui 
 * @returns Promise<User>
 */

export const postUserService =  async (ui: UserInput): Promise<User> => {
    
    if(!ui.name||!ui.surname||!ui.password||!ui.birthDate||!ui.diabetesType) {
        throw new Error("Some required field wasn´t inserted correctly.");
    }

    //funcion verificación email

    const email = await UserCollection.findOne({email: ui.email});
    if(email) throw new Error("The e-mail introduced is already in the DDBBB.");

    const userToDDBB: UserModel = {
        name: ui.name,
        surname: ui.surname,
        email: ui.email,
        password: ui.password,
        birthDate: ui.birthDate,
        diabetesType: ui.diabetesType,
        registerDate: new Date()
    }

    const { insertedId } = await UserCollection.insertOne(userToDDBB);

    const finalUser = fromModelToUser({_id: insertedId, ...userToDDBB});

    return finalUser;

}