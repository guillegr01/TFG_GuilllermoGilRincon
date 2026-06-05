import app from './app';
import { connectDDBB } from './database/mongoConnection';

/**
 * * This one is the main file that is gonna be executed.
 * * Its purpose is to create the server and run it.
 * ? Step 1: create the server using express
 * ? Step 2: specify a port 
 * ? Step 3: create serverHandler function. It shall connect with DDBB and execute the server
 * ? Step 4: call serverHandler function
 */


const PORT = Number(process.env.PORT) || 3000;

const serverHandler = async () => {

    try {
        
        await connectDDBB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}.`);
        });

    } catch (error) {
        console.error("Server could not be released.");
    }

}

serverHandler();
