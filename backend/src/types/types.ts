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
    birthDate: Date,                        //attribute birthDate
    diabetesType: "tipo1" | "tipo2",        //attribute diabetesType
    registerDate: Date,                     //attribute registerDate
    //password only in DDBB
}


/**
 * * Application type GlucoseRegister
 * ? Persistant type -> Own DDBB model 
 */

export type GlucoseRegister = {
    id: string,                             //attribute id
    userId: string,                       //attribute userId
    glucoseValue: number,                   //attribute glucoseRegister
    date_hour: Date,                        //attribute date_hour
    registerMethod: "manual" | "sensor",    //attribute registerMethod
}


/**
 * * Application type CarbohydrateIntake
 * ? Persistant type -> Own DDBB model
 */

export type CarbohydrateIntake = {
    id: string,                                             //attribute id
    userId: string,                                         //attribute userId
    grams: number,                                          //attribute grams
    glucoseValue: number,                                   //attribute glucoseValue
    period: "desayuno" | "comida" | "merienda" | "cena",    //attribute period
    date_hour: Date,                                        //attribute date_hour
    description?: string,                                   //attribute description
    foodImages?: string[],                                  //attribute foodImages
    totalBolus: number,                                    //attribute totalBolus
}


/**
 * * Application type Therapy
 * ? Persistant type -> Own DDBB model
 */
export type Therapy = {
    id: string,                             //attribute id
    userId: string,                         //attribute userId
    ratios: InsulinRatio[],                 //attribute ratios
    glucoseTarget: number,                  //attribute glucose target
    insulinActive: number,                  //attribute insulinActive
    glucoseLimits: GlucoseLimits,           //attribute glucoseLimits                 
}


/**
 * * Application type InsulinRatio
 * ! Non persistant type -> No DDBB model
 */
export type InsulinRatio = {
    period: "desayuno" | "comida" | "merienda" | "cena",    //attribute period
    ratio: number,                                          //attribute ratio (Ui/R) (R=10gr aprox)
    sensibilityFactor: number,                                //attribute sensibility factor ((mg/dl)/Ui)
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

/**
 * * Application type Dashboard
 * ! Non persistant type -> No DDBB Model
 */
export type Dashboard = {
    user: User                              //attribute user
    therapy: Therapy | null                 //attribute therapy
    glucoseRegisters: GlucoseRegister[]     //attribute glucoseRegisters
    meals: CarbohydrateIntake[]             //attribute meals    
}

/**
 * Application type InRangeStats
 * ! Non persistant type -> No DDBB Model
 */
export type InRangeStats = {
    low: number,                            //attribute low
    inRange: number,                        //attribute inRange
    high: number,                           //attribute high
    veryHigh: number                        //attribute veryHigh
}