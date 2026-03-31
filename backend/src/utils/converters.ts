import { User, GlucoseRegister, CarbohydrateIntake, Therapy } from "../types/types"
import { CarbohydrateIntakeModel, GlucoseRegisterModel, TherapyModel, UserModel } from "../types/ddbbModel"

/**
 * * In this converters file, SW shall transform and map data type models
 * * from the DDBB into the native application data types.
 */

/**
 * Function fromModelToUser -> map UserModel to User type
 * @param um 
 * @returns User
 */

export const fromModelToUser = (um : UserModel): User => {
    return {
        id: um._id!.toString(),
        name: um.name,
        surname: um.surname,
        email: um.email,
        birthDate: um.birthDate,
        diabetesType: um.diabetesType,
        registerDate: um.registerDate
    }
}


/**
 * Function fromModelToGlucoseRegister -> map GlucoseRegisterModel to GlucoseRegister type
 * @param grm 
 * @returns GlucoseRegister
 */
export const fromModelToGlucoseRegister = (grm: GlucoseRegisterModel): GlucoseRegister => {
    return {
        id: grm._id!.toString(),
        userId: grm.userId,
        glucoseValue: grm.glucoseValue,
        date_hour: grm.date_hour,
        registerMethod: grm.registerMethod
    }
}


/**
 * Function fromModelToCarbohydrateIntake -> map CarbohydrateIntakeModel to CarbohydrateIntake type
 * @param cim 
 * @returns CarbohydrateIntake
 */
export const fromModelToCarbohydrateIntake = (cim: CarbohydrateIntakeModel): CarbohydrateIntake => {
    return {
        id: cim._id!.toString(),
        userId: cim.userId,
        grams: cim.grams,
        glucoseValue: cim.glucoseValue,
        period: cim.period,
        date_hour: cim.date_hour,
        description: cim.description,
        foodImages: cim.foodImages,
        totalBolus: cim.totalBolus
    }
}


/**
 * Function fromModelToTherapy -> map TherapyModel to Therapy type
 * @param tm 
 * @returns Therapy
 */
export const fromModelToTherapy = (tm: TherapyModel): Therapy => {
    return {
        id: tm._id!.toString(),
        userId: tm.userId,
        ratios: tm.ratios,
        glucoseTarget: tm.glucoseTarget,
        insulinActive: tm.insulinActive,
        glucoseLimits: tm.glucoseLimits
    }
}