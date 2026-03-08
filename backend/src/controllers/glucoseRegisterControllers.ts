import { Request, Response} from "express"
import { postGlucoseRegisterService } from "../services/glucoseRegisterServives";


/**
 * * Controller function related to Glucose Register entity shall recibe all the 
 * * data related from its respective service function, then it has 
 * * to send the response to the server.
 */


/**
 * * postGlucoseRegisterController 
 * ? METHOD: POST
 * @param req 
 * @param res  
 */
export const postGlucoseRegisterController = async(req: Request, res: Response) => {

    try {
        
        const newGlucoseRegister = await postGlucoseRegisterService(req.body);

        res.status(200);
        res.json(newGlucoseRegister);

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while creating new glucose register."});
        }

    }

}