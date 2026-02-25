import { Request, Response} from "express"
import { User } from "../types/types"
import { postUserService, getUserByIdService } from "../services/userServices";

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
        res.json(newUser);
        res.status(200);
    } catch (error) {
        res.json({error: error instanceof Error ? error.message : "Internal Error creating new User."});
        res.status(500);
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

        res.json(user);
        res.status(200);

    } catch (error) {
        res.json({error: error instanceof Error ? error.message : "Internal Error getting User from DDBB."});
        res.status(500);
    }

}