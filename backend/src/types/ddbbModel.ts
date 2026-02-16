import { OptionalId } from "mongodb";
import { InsulinRatio, GlucoseLimits } from "./types";

/**
 * * In this file there are declared and structured all the models 
 * * of those application types that have an own DDBB collection.
 */


/**
 * * UserModel, respective DDBB model for type User.
 */
export type UserModel = OptionalId<{
    name: string,
    surname: string,
    email: string,
    password: string,
    birthDate: Date,
    diabetesType: "Tipo 1" | "Tipo 2",
    registerDate: Date,
}>;


/**
 * * GlucoseRegisterModel, respective DDBB model for type GlucoseRegister.
 */
export type GlucoseRegisterModel = OptionalId<{
    userId: string,
    glucoseValue: number,
    date_hour: Date,
    registerMethod: "Manual" | "Sensor",
}>;


/**
 * * CarbohydrateIntakeModel, respective DDBB model for type CarbohydrateIntake.
 */
export type CarbohydrateIntakeModel = OptionalId<{
    userId: string,
    grams: number,
    glucoseValue: number,
    period: "Desayuno" | "Comida" | "Merienda" | "Cena",
    date_hour: Date,
    description?: string,
    foodImages?: string[],
    totalBolus?: number,
}>;


/**
 * * TherapyModel, respective DDBB model for type Therapy.
 */
export type TherapyModel = OptionalId<{
    userId: string,
    ratios: InsulinRatio[],
    insulinActive: number,
    glucoseLimits: GlucoseLimits,
}>;