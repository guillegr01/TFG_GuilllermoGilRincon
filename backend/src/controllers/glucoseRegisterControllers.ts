import { Request, Response} from "express"
import { postGlucoseRegisterService } from "../services/glucoseRegisterServives";
import { getGlucoseRegisterByIdService, getGlucoseRegistersByUserIdService } from "../services/glucoseRegisterServives";
import { putGlucoseregisterByIdService }  from "../services/glucoseRegisterServives";

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


/**
 * * getGlucoseRegisterByIdController
 * ? METHOD: GET
 * @param req 
 * @param res 
 */
export const getGlucoseRegisterByIdController = async(req: Request, res: Response) => {

    try {
        
        const glucoseRegisterId = req.params.id as string;
        const glucoseRegisterRequested = await getGlucoseRegisterByIdService(glucoseRegisterId);

        res.status(200);
        res.json(glucoseRegisterRequested);

    } catch (error) {

        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
        res.json({message: "Internal server error while getting glucose register."});
        }
        
    }

}


/**
 * * getGlucoseRegistersByUserIdController
 * ? METHOD: GET
 * @param req 
 * @param res 
 */
export const getGlucoseRegistersByUserIdController = async (req: Request, res: Response) => {

    try {
        
        const userId = req.params.userId as string;
        const glucoseRegisters = await getGlucoseRegistersByUserIdService(userId);

        res.status(200);
        res.json(glucoseRegisters);

    } catch (error) {
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while getting user glucose registers."});
        }
    }

}


/**
 * * putGlucoseregisterByIdController
 * ?METHOD: PUT
 * @param req 
 * @param res 
 */
export const putGlucoseregisterByIdController = async (req: Request, res: Response) => {

    try {
        
        const glucoseregisterId = req.params.id as string;
        const modifiedGlucoseRegister = await putGlucoseregisterByIdService(glucoseregisterId, req.body);

        res.status(200);
        res.json(modifiedGlucoseRegister);

    } catch (error) {
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while modifying glucose register."});
        }
    }

}