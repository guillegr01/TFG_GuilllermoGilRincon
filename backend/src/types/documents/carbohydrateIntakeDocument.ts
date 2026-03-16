/**
 * * In this file types such as CarbohydrateIntakeInput for endpoint POST or
 * * GlucoseRegisterInputUpdate for endpoint PUT are defined.
 */

/**
 * * CarbohydrateIntakeInput
 * Info: totalBolus attribute shall be calculated by the backend, 
 * cannot be introduced by the user.
 */
export type CarbohydrateIntakeInput = {
    userId: string,
    grams: number,
    glucoseValue: number,
    period: "desayuno" | "comida" | "merienda" | "cena",
    description?: string,
    foodImages?: string[]
}


export type CarbohydrateIntakeUpdateInput = {
    grams?: number
    glucoseValue?: number
    period?: "desayuno" | "comida" | "merienda" | "cena"
    description?: string
}

export const validPeriods: string[] = ["desayuno", "comida", "merienda", "cena"];