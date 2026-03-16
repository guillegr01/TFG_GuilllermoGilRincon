import { Request, Response } from "express";
import { postCarbohydrateIntakeService, putCarbohydrateIntakeByIdService } from '../services/carbohydrateIntakeService';
import { getCarbohydrateIntakeByIdService, getCarbohydrateIntakeByUserIdService } from '../services/carbohydrateIntakeService';
import { deleteCarbohydrateIntakeByIdService } from '../services/carbohydrateIntakeService';

/**
 * * Controller function related to Carbohydrates Intakes entity shall recibe all the 
 * * data related from its respective service function, then it has 
 * * to send the response to the server.
 */



/**
 * * postCarbohydrateIntakeController
 * ? METHOD: POST
 * @param req 
 * @param res 
 */
export const postCarbohydrateIntakeController = async (req: Request, res: Response) => {

    try {
        
        const newCarbohydrateIntake = await postCarbohydrateIntakeService(req.body);

        res.status(200);
        res.json(newCarbohydrateIntake);

    } catch (error) {

        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while creating new carbohydrate intake."});
        }

    }

}


/**
 * * getCarbohydrateIntakeByIdController
 * ? METHOD: GET
 * @param req 
 * @param res 
 */
export const getCarbohydrateIntakeByIdController = async (req:Request, res: Response) => {

    try {
        
        const carboHydrateIntakeId = req.params.id as string;
        const carboHydrateIntake = await getCarbohydrateIntakeByIdService(carboHydrateIntakeId);

        res.status(200);
        res.json(carboHydrateIntake);

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while getting carbohydrate intake by ID."});
        }

    }

}


/**
 * * getCarbohydrateIntakeByUserIdController
 * @param req 
 * @param res 
 */
export const getCarbohydrateIntakeByUserIdController = async (req: Request, res: Response) => {

    try {

        const userId = req.params.userId as string;
        const carboHydratesIntakes = await getCarbohydrateIntakeByUserIdService(userId);
        
        res.status(200);
        res.json(carboHydratesIntakes);

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while getting carbohydrate intakes by user ID."});
        }

    }

}


/**
 * * putCarbohydrateIntakeByIdController
 * ? METHOD: PUT
 * @param req 
 * @param res 
 */
export const putCarbohydrateIntakeByIdController = async (req: Request, res: Response) => {

    try {
        
        const carbohydrateIntakeID = req.params.id as string;
        const modifiedCarbohydrateIntake = await putCarbohydrateIntakeByIdService(carbohydrateIntakeID, req.body);

        res.status(200);
        res.json(modifiedCarbohydrateIntake);

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while modifying carbohydrate intakes by user ID."});
        }

    }

}



/**
 * * deleteCarbohydrateIntakeByIdController
 * ? METHOD: DELETE
 * @param req 
 * @param res 
 */
export const deleteCarbohydrateIntakeByIdController = async (req: Request, res: Response) => {

    try {
        
        const carbohydrateIntakeId = req.params.id as string;
        const deletedCarbohydrateIntake = await deleteCarbohydrateIntakeByIdService(carbohydrateIntakeId);

        res.status(200);
        res.json(`Carbohydrate intake with id: ${carbohydrateIntakeId} was deleted succesfully from the DDBB.`);

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(404);
            res.json({error: error.message});
        }else {
            res.status(500);
            res.json({message: "Internal server error while getting carbohydrate intakes by user ID."});
        }

    }

}