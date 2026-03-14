/**
 * * In this file types such as GlucoseRegisterInput for endpoint POST or
 * * GlucoseRegisterInputUpdate for endpoint PUT are defined.
 */


export type GlucoseRegisterInput = {
    userId: string,
    glucoseValue: number,
    registerMethod: "manual" | "sensor"
};

export type GlucoseRegisterInputUpdate = {
    glucoseValue?: number;
    date_hour?: Date;
    registerMethod?: "manual" | "sensor";
}

export const validRegisterMethod: string[] = ["manual", "sensor"];