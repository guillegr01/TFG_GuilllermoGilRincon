import { ObjectId } from "mongodb";

/**
 * * Application type User 
 * ? Persistant type -> Own DDBB model 
 */

export type User = {
    id: string,                             //attribute id
    name: string,                           //attribute name
    surname: string,                        //attribute surname
    email: string,                          //attribute email
    password: string,                       //attribute password
    birthDate: Date,                        //attribute birthDate
    diabetesType: "Tipo 1" | "Tipo 2",      //attribute diabetesType
    registerDate: Date,                     //attribute registerDate
}


/**
 * * Application type GlucoseRegister
 * ? Persistant type -> Own DDBB model 
 */

export type GlucoseRegister = {
    id: string,                             //attribute id
    userId: ObjectId,                       //attribute userId
    glucoseValue: number,                   //attribute glucoseRegister
    date_hour: Date,                        //attribute date_hour
    registerMethod: "Manual" | "Sensor",    //attribute registerMethod
}


/**
 * * Application type CarbohydrateIntake
 * ? Persistant type -> Own DDBB model
 */

export type CarbohydrateIntake = {
    id: string,                                             //attribute id
    userId: ObjectId,                                       //attribute userId
    grams: number,                                          //attribute grams
    glucoseValue: number,                                   //attribute glucoseValue
    period: "Desayuno" | "Comida" | "Merienda" | "Cena",    //attribute period
    date_hour: Date,                                        //attribute date_hour
    description?: string,                                   //attribute description
    foodImages?: string[],                                   //attribute foodImages
    totalBolus?: number,                                     //attribute totalBolus
}


/**
 * * Application type Therapy
 * ? Persistant type -> Own DDBB model
 */
export type Therapy = {
    id: string,                             //attribute id
    userId: ObjectId,                       //attribute userId
    ratios: InsulinRatio[],                 //attribute ratios
    insulinActive: number,                  //attribute insulinActive
    glucoseLimits: GlucoseLimits,           //attribute glucoseLimits                 
}


/**
 * * Application type InsulinRatio
 * ! Non persistant type -> No DDBB model
 */
export type InsulinRatio = {
    period: "Desayuno" | "Comida" | "Merienda" | "Cena",    //attribute period
    ratio: number,                                          //attribute ratio (Ui/R) (R=10gr aprox)
    ratioCorrection: number,                                //attribute ratioCorrection = sensibility factor ((mg/dl)/Ui)
}


/**
 * * Application type GlucoseLimits
 * ! Non persistant type -> No DDBB model
 */
export type GlucoseLimits = {
    inRangeLimit: number,                   //attribute inRangeLimit  
    lowLimit: number,                       //attribute lowLimit
    highLimit: number,                      //attribute highLimit
    veryHighLimit: number,                  //attribute veryHighLimit   
}