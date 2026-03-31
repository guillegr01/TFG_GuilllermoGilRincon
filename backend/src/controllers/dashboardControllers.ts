import { Request, Response } from "express";
import { getDashboardService } from "../services/dashboardServices";


/**
 * * Controller function related to DashBoard entity shall recibe all the 
 * * data related from its respective service function, then it has 
 * * to send the response to the server.
 */


/**
 * * getDashboardController
 * ? METHOD: GET
 * @param req 
 * @param res 
 */
export const getDashboardController = async (req: Request, res: Response) => {

    try {
        
        const userId = req.params.userId as string;
        const dashboard = await getDashboardService(userId);

        res.status(200);
        res.json(dashboard);

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while loading dashboard."});
        }

    }

}