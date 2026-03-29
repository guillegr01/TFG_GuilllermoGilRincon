import { InsulinRatio, Therapy } from "../types/types";



/**
 * * calculateBolus
 * Info: this function shall calculat the specific insuline bolus for the user.
 * The formula depends on several parameters such as carbohydrates grams, glucose value,
 * period of the day, insuline ratio, sensibility factor, etc.
 * @param grams 
 * @param glucoseValue 
 * @param period 
 * @param therapy 
 * @returns number
 */
export const calculateBolus = (grams: number, glucoseValue: number, period: string, therapy: Therapy):number => {

    //save ratio from therapy equal to the parameter period 
    const therapyRatio = therapy.ratios.find((ir:InsulinRatio) => {
        return ir.period===period;
    });

    if(!therapyRatio) throw new Error(`No ratio defined for period: ${period}`);


    //calculate portions (1portion = 10gr)
    const portions = grams/10;

    //calculate estandar bolus ( (ui/portion) * portions )
    const estandarBolus = therapyRatio.ratio*portions;

    //calculate ratioCorrection
    let correctionBolus;
    if(glucoseValue<=therapy.glucoseTarget) {
        correctionBolus = 0;
    } else {
        correctionBolus = (glucoseValue - therapy.glucoseTarget) / therapyRatio.sensibilityFactor;
    }
    
    //calculate totalBolus
    const totalBolus = estandarBolus + correctionBolus;

    return totalBolus;
}