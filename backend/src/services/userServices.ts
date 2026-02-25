import { ObjectId } from "mongodb";
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
    diabetesType: "tipo1" | "tipo2";
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


/**
 * * getUserByIdService
 * ? METHOD: POST
 * @param userId 
 * @returns Promise<User>
 */
export const getUserByIdService = async (userId:string): Promise<User> => {

    if(!ObjectId.isValid(userId)) throw new Error("The field user id is invalid.");

    const usersInDDBB = await UserCollection.countDocuments();
    if(usersInDDBB===0) throw new Error("There are no users registered in the database.");

    const userDDBB = await UserCollection.findOne({_id: new ObjectId(userId)});
    if(!userDDBB) throw new Error("User not found.");

    const userFound = fromModelToUser(userDDBB);

    return userFound;

}