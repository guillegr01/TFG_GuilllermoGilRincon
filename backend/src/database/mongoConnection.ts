import { MongoClient } from "mongodb";
import dotenv from "dotenv";

/**
 * * File whose purpose is to create the connection between the server
 * * and our mongo database.
 * ? Step 1: safe the environmental variable MONGO_URL
 * ? Step 2: valid MONGO_URL
 * ? Step 3: create MongoClient and define the DDBB connection function
 * ? Step 4: safe the DDBB from the mongo cluster
 */

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

if(!MONGO_URL) {
    console.error("MONGO_URL not found");
    throw Error("Enter a valid MONGO_URL");
}

const client = new MongoClient(MONGO_URL);

export const connectDDBB =  async () => {
    await client.connect();
    console.info("Connected succesfully to server DDBB."); 
}

export const db = client.db("BBDD_AppDiabetes");