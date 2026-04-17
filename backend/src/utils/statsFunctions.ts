import { GlucoseRegister, InRangeStats, Therapy } from "../types/types"


/**
 * * calculatePercentages
 * @param total 
 * @param count 
 * @returns number
 */
const calculatePercentages = (total: number, count: number): number => {

    if(total === 0) return 0;

    return Math.round((count*100)/ total);
}

/**
 * * calculateStats
 * @param glucoseRegistersArray 
 * @param therapy 
 * @returns InRangeStats
 */
export const calculateStats = (glucoseRegistersArray: GlucoseRegister[], therapy: Therapy): InRangeStats => {

    const registersTotalNum = glucoseRegistersArray.length;

    let lowCont = 0;
    let inRangeCont = 0;
    let highCont = 0;
    let veryHighCont = 0;

    //go through glucose values array and update conts due to therapy glucoseLimits
    glucoseRegistersArray.forEach((gr: GlucoseRegister) => {

        if (gr.glucoseValue < therapy.glucoseLimits.lowLimit) lowCont++;
        else if (gr.glucoseValue < therapy.glucoseLimits.inRangeLimit) inRangeCont++;
        else if (gr.glucoseValue < therapy.glucoseLimits.highLimit) highCont++;
        else veryHighCont++;
    });

    //calculate percentages
    const lowPercentage = calculatePercentages(registersTotalNum, lowCont);
    const inRangePercentage = calculatePercentages(registersTotalNum, inRangeCont);
    const highPercentage = calculatePercentages(registersTotalNum, highCont);
    const veryHighPercentage = calculatePercentages(registersTotalNum, veryHighCont);

    //create return type
    const StatsResults = {
        low: lowPercentage,
        inRange: inRangePercentage,
        high: highPercentage,
        veryHigh: veryHighPercentage
    }

    return StatsResults
}