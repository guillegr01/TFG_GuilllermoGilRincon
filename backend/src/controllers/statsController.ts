import { Request, Response} from "express"
import { getStatsByUserIdService } from "../services/statsService";

/**
 * * Controller function related to therapy entity shall recibe all the 
 * * data related from its respective service function, then it has 
 * * to send the response to the server.
 */

/**
 * * getStatsByUserIdController
 * @param req 
 * @param res 
 */
export const getStatsByUserIdController = async (req: Request, res: Response) => {

    try {
        
        const userId = req.params.userId as string;
        const statsResult = await getStatsByUserIdService(userId);

        res.status(200);
        res.json(statsResult);

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while getting stats."});
        }
    }

}