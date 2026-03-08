import express from 'express'
import { connectDDBB } from './database/mongoConnection';

import { router as userRouter } from './routers/userRoutes';
import { router as glucoseRegisterRouter } from './routers/glucoseRegisterRouter';

/**
 * * This one is the main file that is gonna be executed.
 * * Its purpose is to create the server and run it.
 * ? Step 1: create the server using express
 * ? Step 2: specify a port 
 * ? Step 3: define the routes of the server
 * ? Step 4: create serverHandler function. It shall connect with DDBB and execute the server
 * ? Step 5: call serverHandler function
 */


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//ROUTES
app.use("/user", userRouter);
app.use("/glucose-register", glucoseRegisterRouter);


//endpoint prueba
app.get('/ping', (req, res) => {
    res.json("Server running on LocalHost...");
});

const serverHandler = async () => {

    try {
        
        await connectDDBB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}.`);
        });

    } catch (error) {
        console.error("Server could not be released.");
    }

}

serverHandler();
