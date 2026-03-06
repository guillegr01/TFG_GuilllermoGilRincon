import { Request, Response} from "express"
import { User } from "../types/types"
import { postUserService, getUserByIdService, putUserByIdService, deleteUserByIdService } from "../services/userServices";


/**
 * * Controller function related to User entity shall recibe all the 
 * * data related from its respective service function, then it has 
 * * to send the response to the server.
 */

/**
 * * postUserController 
 * ? METHOD: POST
 * @param req 
 * @param res  
 */
export const postUserController = async (req: Request, res:Response) => {

    try {
        
        const newUser: User = await postUserService(req.body);

        res.status(200);
        res.json(newUser);
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while creating new user."});
        }
    }

}


/**
 * * getUserByIdController
 * @param req 
 * @param res 
 */
export const getUserByIdController = async (req: Request, res: Response) => {

    try {
        
        const userId = req.params.id as string; 
        const user = await getUserByIdService(userId);

        res.status(200);
        res.json(user);
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while getting user from DDBB."});
        }
    }

}


/**
 * * putUserByIdController
 * @param req 
 * @param res 
 */
export const putUserByIdController = async(req: Request, res: Response) => {

    try {
        
        const userId = req.params.id as string;
        const modifiedUser = await putUserByIdService(userId, req.body);

        res.status(200);
        res.json(modifiedUser);
        
    } catch (error) {

        if (error instanceof Error) {
            res.status(404)
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while modifying user from DDBB."});
        }
    }

}


/**
 * * deleteUserByIdController
 * @param req 
 * @param res 
 */
export const deleteUserByIdController = async (req: Request, res: Response)  => {

    try {
        
        const userId = req.params.id as string;
        const isUserDeleted = await deleteUserByIdService(userId);

        res.status(200);
        res.json(`User with id: ${userId} was deleted succesfully from the DDBB.`);

    } catch (error) {

        if (error instanceof Error) {
            res.status(404)
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while deleting user from DDBB."});
        }
    }

}