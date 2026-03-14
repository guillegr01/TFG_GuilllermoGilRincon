/**
 * * In this file types such as UserInput for endpoint POST or
 * * UserInputUpdate for endpoint PUT are defined.
 */

export type UserInput = {
    name: string;
    surname: string;
    email: string;
    password: string;
    birthDate: Date;
    diabetesType: "tipo1" | "tipo2";
};

export type UserInputUpdate = {
    name?: string;
    surname?: string;
    email?: string;
    diabetesType?: "tipo1" | "tipo2";
}

//valid string for attribute DiabetesType
export const validDiabetesType: string[] = ["tipo1", "tipo2"];