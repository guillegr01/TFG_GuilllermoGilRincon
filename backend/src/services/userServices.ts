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

type UserInputUpdate = {
    name?: string;
    surname?: string;
    email?: string;
    diabetesType?: "tipo1" | "tipo2";
}


/**
 * * isValidEmail
 * Description: this function shall validate the email received as a 
 * parameter, then it returns true (valid email) or false (invalid email).
 * To validate an email, the function uses the following regular expression:
 * * /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * @param email 
 * @returns 
 */
export const isValidEmail = (email: string): boolean => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};


/**
 * * postUserService
 * ? METHOD: POST
 * @param ui 
 * @returns Promise<User>
 */
export const postUserService =  async (ui: UserInput): Promise<User> => {
    
    if(!ui.name||!ui.surname||!ui.email||!ui.password||!ui.birthDate||!ui.diabetesType) {
        throw new Error("Some required field wasn´t inserted correctly.");
    }

    if(!isValidEmail(ui.email)) throw new Error("The entered email is not valid.");

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



/**
 * * putUserByIdService
 * method findOneAndUpdate is used instead of updateOne, cause the 
 * findOneAndUpdate updates the object and then it returns the model
 * ? METHOD: PUT
 * @param userId 
 * @param uiu 
 * @returns Promise<User>
 */
export const putUserByIdService = async (userId: string, uiu: UserInputUpdate): Promise<User> => {

    if(!userId) throw new Error("The field id is required.");

    if(!ObjectId.isValid(userId)) throw new Error("The field user id is invalid.");

    if(!uiu.name && !uiu.surname && !uiu.email && !uiu.diabetesType) throw new Error("No fields data provided to update.");

    if(uiu.email) {

        if(!isValidEmail(uiu.email)) throw new Error("The entered email is not valid.");

        //insertedEmail found in DDBB but other user owns taht email. $ne = not equal
        const emailInDDBB = await UserCollection.findOne({email: uiu.email, _id: {$ne: new ObjectId(userId)}})

        if(emailInDDBB) throw new Error("Provided email is already in use by other User.");
    }

    const userModificationResult = await UserCollection.findOneAndUpdate({_id: new ObjectId(userId)}, {$set: uiu}, {returnDocument: "after"});

    if(!userModificationResult) throw new Error("Modified user not found");

    const modifiedUser = fromModelToUser(userModificationResult);

    return modifiedUser;
}


/**
 * * deleteUserByIdService
 * info: in this service method used is 'deleteOne' cause is not
 * neccesary to get back de userModel deleted. Only have to know 
 * if the delete action was succesfull or not.
 * 
 * ? METHOD: DELETE
 * @param userId 
 * @returns Promise<boolean>
 */
export const deleteUserByIdService = async (userId: string): Promise<boolean> => {

    let deletedUser: boolean;

    if(!userId) throw new Error("The field id is required.");

    if(!ObjectId.isValid(userId)) throw new Error("The field user id is invalid.");

    const userToDeleteDDBB = await UserCollection.findOne({_id: new ObjectId(userId)});

    if(!userToDeleteDDBB) throw new Error("There is no user with the provided id.");

    const { deletedCount } = await UserCollection.deleteOne({_id: new ObjectId(userId)}); 

    if(deletedCount===0) {
        deletedUser = false;
        throw new Error("User to delete was not found.");
    }else {
        deletedUser = true;
    }

    return deletedUser;
}
