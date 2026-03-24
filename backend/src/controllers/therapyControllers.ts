import { Request, Response} from "express"
import { postTherapyService } from "../services/therapyServices"


/**
 * * Controller function related to therapy entity shall recibe all the 
 * * data related from its respective service function, then it has 
 * * to send the response to the server.
 */


/**
 * * postTherapyController
 * ? METHOD: POST
 * @param req 
 * @param res 
 */
export const postTherapyController = async (req: Request, res: Response) => {

    try {
        
        const newTherapy = await postTherapyService(req.body);
        
        res.status(200);
        res.json(newTherapy); 

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while creating new therapy."});
        }

    }

}